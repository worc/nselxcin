import { render } from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./app/index.js";

render((
    <BrowserRouter>
        <App host={window.location.host} />
    </BrowserRouter>
), document.getElementById("app"));
