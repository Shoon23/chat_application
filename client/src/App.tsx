import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./middleware/PrivateRoutes";
import PersistLogin from "./middleware/PersistLogin";
import CheckAccess from "./middleware/CheckAccess";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        <Route element={<CheckAccess />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
