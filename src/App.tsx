import React from "react";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";

function App() {
    return useRoutes(Router);
}

export default App;
