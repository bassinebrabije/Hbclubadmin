import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Coachs from "./components/Coaching";
import Members from "./components/Members";
import Layout from "./components/Layout";
import Trainers from "./components/Trainers";
import Request from "./components/Request";
import Loginpage from './components/Login';
import Registerpage from './components/admins';
import Notfoundpage from './components/Notfound';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin');
  return isAuthenticated ? <Navigate to="/" /> : children;
};


function App() {
  const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="Coaching" element={<ProtectedRoute><Coachs /></ProtectedRoute>} />
          <Route path="Members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
          <Route path="Trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute>} />
          {loggedInAdmin && loggedInAdmin.username.includes('admin') && (
            <Route path="Register" element={<ProtectedRoute><Registerpage /></ProtectedRoute>} />
          )}
          <Route path="Request" element={<ProtectedRoute><Request /></ProtectedRoute>} />
        </Route>
        <Route path="login" element={<RedirectIfAuthenticated><Loginpage /></RedirectIfAuthenticated>} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
