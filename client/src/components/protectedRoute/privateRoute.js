import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setLogin, setLogout } from '../../slices/login';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("jwt_id");

  React.useEffect(() => {
    if (token) {
      dispatch(setLogin(true));
    } else {
      dispatch(setLogout());
    }
  }, [dispatch, token]);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
