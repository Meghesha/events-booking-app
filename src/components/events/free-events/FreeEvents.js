import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFreeEvents } from "../../../redux/events/events.actions";
import { EVENTS_FEATURE_KEY } from "../../../redux/events/events.reducer";
import Spinner from "../../root/spinner/Spinner";

let FreeEvents = () => {
  let dispatch = useDispatch();
  let eventsInfo = useSelector((state) => {
    return state[EVENTS_FEATURE_KEY];
  });
  let { loading, events } = eventsInfo;

  useEffect(() => {
    dispatch(fetchFreeEvents());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p className="h3 text-success">Free Events</p>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              harum labore molestiae ipsum commodi, tempore in. Culpa aut enim,
              cumque doloremque soluta ratione cupiditate voluptas, commodi
              animi dolorem voluptate iusto.
            </p>
            <p className="font-weight-bold">
              Total Free Events : {events.length}
            </p>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
export default FreeEvents;
