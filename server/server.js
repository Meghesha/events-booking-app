const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');

//configure cors
app.use(cors());

//configure dotEnv
dotEnv.config({path : './config/config.env'});

//configure expreess to accept form data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const hostname = process.env.LOCAL_HOST_NAME;
const port = process.env.LOCAL_PORT;

//home page request
app.get('/', (request, response)=>{
    response.send('Welcome to Events Booking App Express Server')
})

//connect to mongoDB
mongoose.connect(process.env.MONGODB_LOCAL_DB_URL, {
    useNewUrlParser : true
}).then((response)=>{
    console.log('Connected to DB Successfully....');
}).catch((error)=>{
    console.error(error);
    process.exit(1);   //stop the node js process
})

//router configuration
app.use('/users', require('./router/userRouter'));
app.use('/events', require('./router/eventRouter'));

//listen to port
app.listen(port, hostname, ()=>{
    console.log(`Express Server is started at http://${hostname}:${port}`);
})