import { FETCH_FREE_EVENTS_FAILURE, FETCH_FREE_EVENTS_REQUEST, FETCH_FREE_EVENTS_SUCCESS, FETCH_PRO_EVENTS_FAILURE, FETCH_PRO_EVENTS_REQUEST, FETCH_PRO_EVENTS_SUCCESS, UPLOAD_EVENTS_FAILURE, UPLOAD_EVENTS_REQUEST, UPLOAD_EVENTS_SUCCESS } from "./events.actionTypes";

export const EVENTS_FEATURE_KEY = 'events';

let initialState = {
    loading : false,
    events : [],
    errorMessage : ''
}

let eventReducer = (state=initialState , action)=>{
    let {type , payload} = action;
    switch(type){
        case FETCH_FREE_EVENTS_REQUEST:
        case FETCH_PRO_EVENTS_REQUEST:
        case UPLOAD_EVENTS_REQUEST:        
            return{
                ...state,
                loading:true
            }
        case FETCH_FREE_EVENTS_SUCCESS:
            return{
                ...state,
                loading:false,
                events: payload
            }
        case FETCH_PRO_EVENTS_SUCCESS:
            return{
                ...state,
                loading:false,
                events: payload
            }
        case UPLOAD_EVENTS_SUCCESS:
            return{
                ...state,
                loading:false,
                events: payload
            }        
        case FETCH_FREE_EVENTS_FAILURE:
        case FETCH_PRO_EVENTS_FAILURE:
        case UPLOAD_EVENTS_FAILURE:        
            return{
                ...state,
                loading:false,
                errorMessage : payload
            }        
        default : return state;    
    }
}

export {eventReducer};