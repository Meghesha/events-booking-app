import Axios from "axios";
import { FETCH_FREE_EVENTS_FAILURE, FETCH_FREE_EVENTS_REQUEST, FETCH_FREE_EVENTS_SUCCESS, FETCH_PRO_EVENTS_FAILURE, FETCH_PRO_EVENTS_REQUEST, FETCH_PRO_EVENTS_SUCCESS, UPLOAD_EVENTS_FAILURE, UPLOAD_EVENTS_REQUEST, UPLOAD_EVENTS_SUCCESS } from "./events.actionTypes"

let fetchFreeEvents = ()=>{
    return(dispatch)=>{
        dispatch({type:FETCH_FREE_EVENTS_REQUEST});
        let dataURL = 'http://127.0.0.1:5000/events/free-events';
        Axios.get(dataURL).then((response)=>{
            dispatch({type:FETCH_FREE_EVENTS_SUCCESS , payload:response.data})
        }).catch((error)=>{
            dispatch({type:FETCH_FREE_EVENTS_FAILURE , payload:error})
        })
    }
}

let fetchProEvents = ()=>{
    return(dispatch)=>{
        dispatch({type:FETCH_PRO_EVENTS_REQUEST});
        let dataURL = 'http://127.0.0.1:5000/events/pro-events';
        Axios.get(dataURL).then((response)=>{
            dispatch({type:FETCH_PRO_EVENTS_SUCCESS , payload:response.data})
        }).catch((error)=>{
            dispatch({type:FETCH_PRO_EVENTS_FAILURE , payload:error})
        })
    }
}

let uploadEvents = (event, navigate)=>{
    return(dispatch)=>{
        dispatch({type:UPLOAD_EVENTS_REQUEST});
        let dataURL = 'http://127.0.0.1:5000/events/upload';
        Axios.post(dataURL, event).then((response)=>{
            dispatch({type:UPLOAD_EVENTS_SUCCESS , payload:response.data});
            (event.type === 'PRO') ? navigate('/events/pro') : navigate ('/events/free');
        }).catch((error)=>{
            dispatch({type:UPLOAD_EVENTS_FAILURE , payload:error})
        })
    }
}

export {fetchFreeEvents, fetchProEvents, uploadEvents}