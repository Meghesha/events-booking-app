import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { registerUser } from '../../../redux/users/users.actions';

let Register = ()=>{
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let[user, setUser] = useState({
        name : '',
        email : '',
        password : ''
    })
    let[userError, setUserError] = useState({
        nameError : null,
        emailError : null,
        passwordError : null
    })

    let[emptyForm, setEmptyForm] = useState(false);

    //handle userName
    let handleUsername = (e)=>{
        setUser({...user, name:e.target.value});
        let regExp = /^[a-zA-Z0-9]{4,10}$/;
        if(regExp.test(e.target.value)){
            setUserError({...userError, nameError : ''});
        }
        else{
            setUserError({...userError, nameError:'Enter a proper Name'})
        }
    }

    //handle Email
    let handleEmail = (e)=>{
        setUser({...user, email:e.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if(regExp.test(e.target.value)){
            setUserError({...userError, emailError : ''});
        }
        else{
            setUserError({...userError, emailError:'Enter a proper Email'})
        }
    }

    //handle password
    let handlePassword = (e)=>{
        setUser({...user, password:e.target.value});
        let regExp = /^[A-Za-z]\w{7,14}$/;
        if(regExp.test(e.target.value)){
            setUserError({...userError, passwordError : ''});
        }
        else{
            setUserError({...userError, passwordError:'Enter a proper Password'})
        }
    }

    //submit register
    let submitRegister=(e)=>{
        e.preventDefault();
        // console.log(user);
        if(user.name !=='' && user.email !=='' && user.password !==''){
            // console.log(user);
            dispatch(registerUser(user, navigate))
        }
        else{
            setEmptyForm(true);
        }
    }


    return(
        <React.Fragment>
            {/* <pre>{JSON.stringify(user)}</pre>
            <pre>{JSON.stringify(userError)}</pre> */}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-4 m-auto">
                        {
                            emptyForm &&
                            <div className='alert alert-danger alert-dismissible'>
                                <button className="close" onClick={e => setEmptyForm(false)}>
                                    <i className="fa fa-times-circle"></i>
                                </button>
                                <small className='font-weight-bold'>Please fill in the details</small>
                            </div>
                        }
                        <div className="card">
                            <div className="card-header bg-secondary text-white">
                                <p className="h4">Register Here</p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitRegister}>
                                <div className="form-group">
                                        <input 
                                        name="name"
                                        value={user.name}
                                        onChange={handleUsername} 
                                        type="text" className={`form-control ${userError.nameError ? 'is-invalid' : ''}`} placeholder='Name'/>
                                        {
                                            userError.nameError ? <small className='text-danger'>{userError.nameError}</small> : null
                                        }
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        name="email"
                                        value={user.email}
                                        onChange={handleEmail}
                                        type="email" className={`form-control ${userError.emailError ? 'is-invalid' : ''}`} placeholder='Email'/>
                                         {
                                            userError.emailError ? <small className='text-danger'>{userError.emailError}</small> : null
                                        }
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        name="password"
                                        value={user.password}
                                        onChange={handlePassword}
                                        type="password" className={`form-control ${userError.passwordError ? 'is-invalid' : ''}`} placeholder='Password'/>
                                         {
                                            userError.passwordError ? <small className='text-danger'>{userError.passwordError}</small> : null
                                        }
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-secondary btn-sm" value="Register"/>
                                    </div>
                                </form>
                                <small>
                                    Have an Account ?
                                    <Link to='/users/login' className='text-green'> Login</Link>
                                </small>
                            </div>
                            <div className="card-footer">
                                <p className="h3 text-danger text-center">Events Now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Register;