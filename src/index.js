import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import WeddingInviteSite from "./WeddingInviteSite";
import "./index.css";
import "./WeddingCalendar.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <WeddingInviteSite />
    </HashRouter>
  </React.StrictMode>
);