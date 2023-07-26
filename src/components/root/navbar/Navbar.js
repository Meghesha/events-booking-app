import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Routes, useNavigate, Navigate } from "react-router-dom";
import { USERS_FEATURE_KEY } from "../../../redux/users/users.reducer";
import { logOut } from "../../../redux/users/users.actions";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Routes
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/users/login" replace={true} />
        )
      }
    />
  );
};

const Navbar = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let userInfo = useSelector((state) => {
    return state[USERS_FEATURE_KEY];
  });

  let { isAuthenticated, loading, user } = userInfo;

  let logoutUser = () => {
    dispatch(logOut(navigate));
  };

  let beforeLinks = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/users/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users/register" className="nav-link">
          Register
        </Link>
      </li>
    </React.Fragment>
  );

  let afterLinks = (
    <React.Fragment>
      {user ? (
        <li className="nav-item">
          <Link to="#" className="nav-link">
            <img src={user.image} width="20" height="20" className="rounded-circle" alt="" />
            {user.name}
          </Link>
        </li>
      ) : null}
      <li className="nav-item">
        <Link to="#" className="nav-link" onClick={logoutUser}>
          Logout
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar navbar-light navbar-expand-sm bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <p className="h2 text-danger">Events Now</p>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/events/free" className="nav-link">
                  Free Events
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/events/pro" className="nav-link">
                  Pro Events
                </Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link to="/events/upload" className="nav-link">
                    Upload Events
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ml-auto">
              {!loading && (
                <React.Fragment>
                  {!isAuthenticated ? (
                    beforeLinks
                  ) : (
                    
                      afterLinks
                      
                    
                  )}
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
