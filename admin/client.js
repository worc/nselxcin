import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";

import App from './app.js';

render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById("app"));
