import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate} from "react-router";

export default function AdminRoute({ children }) {
    const userSignin = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignin;
    return userInfo && userInfo.role ? children : <Navigate to="/signIn" />;
}