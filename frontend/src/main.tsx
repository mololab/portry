import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScanPage from "./components/pages/scan/scan";
import WelcomePage from "./components/pages/welcome/welcome";
import "./style.css";
import "./css/common.css";
import "./css/welcome.css";
import "./css/scan.css";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/scan" element={<ScanPage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
