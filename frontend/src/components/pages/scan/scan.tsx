import React from "react";
import SearchSVG from "../../../assets/svg/search.svg";
import LiveReloadOffSVG from "../../../assets/svg/live-reload-off.svg";
import LiveReloadOnSVG from "../../../assets/svg/live-reload-on.svg";
import FilterSVG from "../../../assets/svg/filter.svg";
import RefreshSVG from "../../../assets/svg/refresh.svg";
import CustomTable from "../../table";

interface ScanPageProps {}

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

  liveReloadSwitch() {
    console.log("si");
    this.setState({
      live_reload: !this.state.live_reload,
    });
  }

  refreshTable() {}

  render() {
    const { live_reload } = this.state;

    return (
      <>
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
              <div className="filter-container clickable">
                <img
                  className="clickable-icon"
                  src={FilterSVG}
                  alt="Filter icon"
                />
              </div>

              {/* refresh */}
              <div className="refresh-container clickable">
                <img
                  className="clickable-icon"
                  src={RefreshSVG}
                  alt="Refresh icon"
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
                <span>hided table container</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
