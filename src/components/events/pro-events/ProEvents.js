import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProEvents } from '../../../redux/events/events.actions';
import { EVENTS_FEATURE_KEY } from '../../../redux/events/events.reducer';
import Spinner from '../../root/spinner/Spinner';
import { USERS_FEATURE_KEY } from '../../../redux/users/users.reducer';
import { useNavigate } from "react-router-dom";

const ProEvents = () => {
  let dispatch = useDispatch();
  let eventsInfo = useSelector((state) => {
    return state[EVENTS_FEATURE_KEY];
  });
  let { loading, events } = eventsInfo;

  // Get the user authentication status from the Redux state
  let userInfo = useSelector((state) => {
    return state[USERS_FEATURE_KEY];
  });
  let { isAuthenticated } = userInfo;

  let navigate = useNavigate(); // Add this line to get the navigate function

  useEffect(() => {
    dispatch(fetchProEvents());
  }, [dispatch]);

  if (!isAuthenticated) {
    // Use the navigate function to redirect to the login page if not authenticated
    navigate("/users/login");
    return null; // Return null to avoid rendering the component temporarily
  }

  return (
    <React.Fragment>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p className="h3 text-danger">Pro Events</p>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis harum labore molestiae ipsum commodi, tempore in.
              Culpa aut enim, cumque doloremque soluta ratione cupiditate voluptas, commodi animi dolorem voluptate iusto.
            </p>
            <p className="font-weight-bold">Total Pro Events : {events.length}</p>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {events.length > 0 ? (
              <React.Fragment>
                {events.map((event) => {
                  return (
                    <div className="row mt-3" key={event._id}>
                       <div className="col animated slideInUp" key={event._id}>
                          <div className="card">
                            <img
                              src={event.image}
                              alt=""
                              className="img-fluid"
                            />
                            <div className="card-body">
                              <div className="row">
                                <div className="col">
                                  <p className="h5 text-success">
                                    {event.name}
                                  </p>
                                  <p className="h6">{event.date}</p>
                                </div>
                                <div className="col">
                                  <button className="btn btn-success btn-sm">
                                    BOOK NOW
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProEvents;
