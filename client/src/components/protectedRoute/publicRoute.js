import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setLogout } from '../../slices/login';
import Cookies from 'js-cookie';

const PublicRoute = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.loginInfo.isLogin); // Adjust state path if needed
  const token = Cookies.get("jwt_id");

  React.useEffect(() => {
    if (token) {
      dispatch(setLogin(true));
    } else {
      dispatch(setLogout());
    }
  }, [dispatch, token]);

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
