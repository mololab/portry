import React from "react";
import GithubLogo from "../../assets/svg/github.svg";
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
        <div className="welcomepage-container">
          <div className="welcoming-container">
            <span>hi, welcome to</span>
            <span>portry</span>
          </div>

          <div className="content-container">
            <Link className="scan-link" to="/scan">
              <div className="scan-button clickable">
                <span>scan</span>
              </div>
            </Link>

            <span className="scan-text">scan your ports easily</span>

            <a
              href="https://github.com/mololab/portry"
              target="_blank"
              rel="noreferrer"
            >
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
