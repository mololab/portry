import React from "react";

interface WelcomePageProps {}

interface WelcomePageState {}

export default class WelcomePage extends React.Component<
  WelcomePageProps,
  WelcomePageState
> {
  render() {
    return (
      <>
        <h1>WelcomePage</h1>

        <span className="test-span">Heyo</span>
      </>
    );
  }
}
