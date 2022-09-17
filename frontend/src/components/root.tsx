import React from "react";
import { Route } from "react-router-dom";
import ScanPage from "./pages/scan/scan";
import WelcomePage from "./pages/welcome/welcome";

interface RootProps {}

interface RootState {}

export default class Root extends React.Component<RootProps, RootState> {
  render() {
    let routes = [
      <Route path={"/"}>
        <WelcomePage />
      </Route>,
      <Route path={"/scan"}>
        <ScanPage />
      </Route>,
    ];
    return <></>;
  }
}
