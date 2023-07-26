import { useSelector } from "react-redux"
import { USERS_FEATURE_KEY } from "../redux/users/users.reducer";
import {Navigate, Route} from 'react-router-dom';

let PrivateRoute = ({component : Component, ...rest}) =>{
    let{isAuthenticated, loading} = useSelector((state)=>{
        return state[USERS_FEATURE_KEY];
    });
    return <Route {...rest} render={(props)=>{
        return !loading && !isAuthenticated ? <Navigate to='/users/login'/> : <Component {...props}/> 
    }}/>
};
export default PrivateRoute;

