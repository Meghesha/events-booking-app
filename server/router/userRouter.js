const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken'); 
const authenticate = require('../middleware/authenticate');

/* Usage : Register a User
URL : http://127.0.0.1.5000/users/register
Method : POST
Fields : name, email, password
Access : Public */

router.post('/register', [
    check('name').notEmpty().withMessage('Name is Required'),
    check('email').isEmail().withMessage('Enter a proper Email'),
    check('password').isLength({min:6}).withMessage('Password should be min 6 characters')
], async(request, response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){    //some validation is violated stop the flow
        return response.status(400).json({errors : errors.array()}); 
    }
    try{
        let{name, email, password} = request.body;
        //if user already exists or not
        let user = await User.findOne({email});
        if(user){
            return response.status(400).json({errors : [{msg : 'User is already exists'}]})
        }
        //encrypt the password
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        //gravatar image
        let image = gravatar.url(email,{
            s : '400',
            r : 'pd',
            d : 'mm'
        });
        //store the data to db
        let isAdmin = false;
        user = new User({name,email,password,image,isAdmin});
        user = await user.save();
        //generate a token
        let payload = {
            user :{
                id : user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token)=>{
            if(err) throw err;
            response.status(200).json({
                result : 'Success',
                token : token
            });
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({errors : error})
    } 
});

/* Usage : Login a User
URL : http://127.0.0.1.5000/users/login
Method : POST
Fields : email, password
Access : Public */

router.post('/login', [
    check('email').isEmail().withMessage('Enter a proper Email'),
    check('password').isLength({min:6}).withMessage('Password should be atleast 6 characters')
], async(request, response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){    //some validation is violated stop the flow
        return response.status(400).json({errors : errors.array()}); 
    }
    try{
        let{email,password}= request.body;
        //user exists or not
        let user = await User.findOne({email});
        if(!user){
            return response.status(401).json({errors:[{msg:'Invalid credentials'}]})
        }
        //match the client plain password with encoded db password
        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return response.status(401).json({errors:[{msg:'Invalid credentials'}]})
        }
        //generate a token
        let payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET_KEY, (err,token)=>{
            if(err)throw err;
            response.status(200).json({
                result:'success',
                token:token
            })
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({errors:error})
    }
});

/* Usage : Get a User Info
URL : http://127.0.0.1.5000/users/
Method : GET
Fields : no fields
Access : PRIVATE */
router.get('/', authenticate, async(request,response)=>{
    try{
        let user = await User.findById(request.user.id).select('-password'); //except password everything i get as a response
        response.status(200).json(user);
    }
    catch(error){
        response.status(500).json(error);
    }
})

module.exports = router;