import React from "react";
import SearchSVG from "../../../assets/svg/search.svg";
import LiveReloadOffSVG from "../../../assets/svg/live-reload-off.svg";
import LiveReloadOnSVG from "../../../assets/svg/live-reload-on.svg";
import FilterSVG from "../../../assets/svg/filter.svg";
import RefreshSVG from "../../../assets/svg/refresh.svg";
import CollapseSVG from "../../../assets/svg/collapse.svg";

import { FetchPorts, Greet } from "../../../../wailsjs/go/main/App"

import CustomTable from "../../table";
import { Popup } from "semantic-ui-react";
// import "collapsible-react-component/dist/index.css";

interface ScanPageProps { }

interface ScanPageState {
  live_reload: boolean;
}

export default class ScanPage extends React.Component<
  ScanPageProps,
  ScanPageState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      live_reload: false,
    };
  }


  /*  FetchPorts() {
    window.go.main.App.Greet(test).then(data => {
      document.getElementById("result").innerText = data;
    });
  } */

  async fetch() {
    (document.getElementById("mySpan") as HTMLElement).textContent = ""
    FetchPorts().then((data) => {
      (document.getElementById("mySpan") as HTMLElement).textContent = JSON.stringify(data)
      console.log("a", data)
    })
  }




  liveReloadSwitch() {
    this.setState({
      live_reload: !this.state.live_reload,
    });
  }

  refreshTable() { }

  render() {
    const { live_reload } = this.state;

    return (
      <>
        <span id="mySpan">Span</span>
        <div className="scanpage-container">
          <div className="bar-container">
            <span className="">portry</span>
          </div>

          <div className="ports-container">
            <div className="controller-container">
              {/* search bar */}
              <div className="search-container">
                <input type="text" placeholder="Search" />

                <img src={SearchSVG} alt="Search icon" />
              </div>

              {/* live reload */}
              <div
                onClick={this.liveReloadSwitch.bind(this)}
                className="live-reload-container clickable"
              >
                {live_reload ? (
                  <img
                    className="clickable-icon"
                    src={LiveReloadOnSVG}
                    alt="Live Reload On icon"
                  />
                ) : (
                  <img
                    className="clickable-icon"
                    src={LiveReloadOffSVG}
                    alt="Live Reload Off icon"
                  />
                )}
              </div>

              {/* filter */}
              <Popup
                trigger={
                  <div className="filter-container clickable">
                    <img
                      className="clickable-icon"
                      src={FilterSVG}
                      alt="Filter icon"
                    />
                  </div>
                }
                flowing
                on="click"
                position="bottom right"
              // open={undefined} // false // true
              >
                <div className="filter-container-popup">
                  {/* start/end port */}
                  <div className="port-filter-container">
                    <span>Port</span>
                    <div className="port-number-input-container">
                      <input type="text" placeholder="Port number" value={0} />
                    </div>
                    <span>to</span>
                    <div className="port-number-input-container">
                      <input
                        type="text"
                        placeholder="Port number"
                        value={65553}
                      />
                    </div>
                  </div>

                  {/* visible columns */}
                  <div className="column-filter-container">
                    <div>
                      <input id="column-port" type="checkbox" />
                      <label htmlFor="column-port">Port</label>
                    </div>

                    <div>
                      <input id="column-processid" type="checkbox" />
                      <label htmlFor="column-processid">Process ID</label>
                    </div>

                    <div>
                      <input id="column-processname" type="checkbox" />
                      <label htmlFor="column-processname">Process Name</label>
                    </div>

                    <div>
                      <input id="column-sockettype" type="checkbox" />
                      <label htmlFor="column-sockettype">Socket Type</label>
                    </div>
                  </div>

                  {/* apply/cancel actions */}
                  <div className="actions">
                    <div className="cancel-button clickable">
                      <span>Cancel</span>
                    </div>

                    <div className="apply-button clickable">
                      <span>Apply</span>
                    </div>
                  </div>
                </div>
              </Popup>

              {/* refresh */}
              <div className="refresh-container clickable">
                <img
                  className="clickable-icon"
                  src={RefreshSVG}
                  alt="Refresh icon"
                  onClick={this.fetch.bind(this)}
                />
              </div>

              {/* table-info */}
              <div className="table-info-container">
                <span>Showing 8 items</span>
              </div>
            </div>

            <div className="tables-container">
              <div className="table-container">
                <CustomTable />
              </div>

              <div className="hided-table-container">
                <div className="hided-title-container clickable">
                  <span className="hided-title">
                    Hided list{" "}
                    <img
                      className="rotated"
                      src={CollapseSVG}
                      alt="Collapse icon"
                    />
                  </span>
                </div>
                <div className="hided-table hiding-list">
                  {/* hide / show class */}
                  <CustomTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
