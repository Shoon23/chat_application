import React from "react";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";

type Props = {};

const App: React.FC<Props> = ({}) => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
