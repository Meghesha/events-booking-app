import { combineReducers } from "redux";
import { EVENTS_FEATURE_KEY, eventReducer } from "./events/events.reducer";
import { USERS_FEATURE_KEY, userReducer } from "./users/users.reducer";
import { ALERT_FEATURE_KEY, alertReducer } from "./alert/alert.reducer";

export const rootReducer = combineReducers({
    [EVENTS_FEATURE_KEY] : eventReducer,
    [USERS_FEATURE_KEY] : userReducer,
    [ALERT_FEATURE_KEY] : alertReducer
})