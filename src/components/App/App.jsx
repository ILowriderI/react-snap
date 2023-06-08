import Header from "../Header/Header";
import routesConfig from "../../routes/routesConfig.js";
import { Route, Routes } from "react-router-dom";
import { isTokenExp } from "../../utils/token";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      isTokenExp();
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        {routesConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default App;
