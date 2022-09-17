import React from "react";
import GithubLogo from "../../../assets/svg/github.svg";
import ScanButton from "../../../assets/svg/scan-button.svg";
import { Link } from "react-router-dom";

interface WelcomePageProps {}

interface WelcomePageState {}

export default class WelcomePage extends React.Component<
  WelcomePageProps,
  WelcomePageState
> {
  render() {
    return (
      <>
        <div className="welcome-container">
          <div className="welcoming-container">
            <span>hi, welcome to</span>
            <span>portry</span>
          </div>

          <div className="content-container">
            {/* <img className="scan-button" src={ScanButton} alt="React Logo" /> */}

            <Link className="scan-link" to="/scan">
              <div className="scan-button clickable">
                <span>scan</span>
              </div>
            </Link>

            <span className="scan-text">scan your ports easily</span>

            <a href="https://github.com" target="_blank" rel="noreferrer">
              <img
                className="github-icon clickable"
                src={GithubLogo}
                alt="React Logo"
              />
            </a>
          </div>
        </div>
      </>
    );
  }
}
