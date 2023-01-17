import React from "react";
import SearchSVG from "../../../assets/svg/search.svg";
import LiveReloadOffSVG from "../../../assets/svg/live-reload-off.svg";
import LiveReloadOnSVG from "../../../assets/svg/live-reload-on.svg";
import FilterSVG from "../../../assets/svg/filter.svg";
import RefreshSVG from "../../../assets/svg/refresh.svg";
import CollapseSVG from "../../../assets/svg/collapse.svg";
import CustomTable from "../../table";
import { Popup } from "semantic-ui-react";
import { Port } from "../../types";
import { FetchPorts } from "../../../../wailsjs/go/main/App";
import { FormatToUI } from "../../utils/format";
import { Oval } from "react-loader-spinner";

interface ScanPageProps {}

interface ScanPageState {
  search_text: string;

  live_reload: boolean;
  ports: Port[];
  port_start: number;
  port_end: number;
  processID_visibility: boolean;
  process_name_visibility: boolean;
  socket_type_visibility: boolean;

  popup_open: boolean;

  popup_port_start: number;
  popup_port_end: number;
  popup_processID_visibility: boolean;
  popup_process_name_visibility: boolean;
  popup_socket_type_visibility: boolean;

  filter_applying: boolean;

  data_fetching: boolean;
}

export default class ScanPage extends React.Component<
  ScanPageProps,
  ScanPageState
> {
  liveReloadInterval: any;

  constructor(props: any) {
    super(props);

    this.state = {
      search_text: "",

      live_reload: false,
      ports: [],
      port_start: 0,
      port_end: 65553,
      processID_visibility: true,
      process_name_visibility: true,
      socket_type_visibility: true,

      popup_open: false,

      popup_port_start: 0,
      popup_port_end: 65553,
      popup_processID_visibility: true,
      popup_process_name_visibility: true,
      popup_socket_type_visibility: true,

      filter_applying: false,

      data_fetching: false,
    };

    this.fetchPorts();
  }

  liveReloadSwitch() {
    if (this.state.live_reload == false) {
      this.liveReloadInterval = setInterval(
        () => {
          this.fetchPorts();
        },
        1000,
        this
      );
    } else {
      clearInterval(this.liveReloadInterval);
    }

    this.setState({
      live_reload: !this.state.live_reload,
    });
  }

  popupOpen = () => {
    this.setState({ popup_open: true });
  };

  popupClose = () => {
    this.setState({ popup_open: false });
  };

  applyTableFilter() {
    this.setState(
      {
        port_start: this.state.popup_port_start,
        port_end: this.state.popup_port_end,
        processID_visibility: this.state.popup_processID_visibility,
        process_name_visibility: this.state.popup_process_name_visibility,
        socket_type_visibility: this.state.popup_socket_type_visibility,

        filter_applying: true,
      },
      () => {
        this.fetchPorts();
      }
    );

    setTimeout(() => {
      this.setState({
        filter_applying: false,
      });
      this.popupClose();
    }, 500);
  }

  cancelTableFilter() {
    this.popupClose();
  }

  refreshTable() {
    this.fetchPorts();
  }

  fetchPorts() {
    this.setState({
      data_fetching: true,
    });

    FetchPorts(this.state.port_start, this.state.port_end)
      .then((result) => {
        let ports = FormatToUI(result);

        this.setState({
          ports: ports,
          data_fetching: false,
        });
      })
      .catch((err) => {
        console.error(`ERROR1`, err);
      });
  }

  searchFilter(search_text: string, ports: Port[]): Port[] {
    let filtered_ports: Port[] = [];

    ports.forEach((port) => {
      let search_string = [
        String(port.port),
        String(port.process_id),
        port.process_name,
        port.socket_type,
      ].join(" ");

      if (search_string.toLowerCase().includes(search_text.toLowerCase())) {
        filtered_ports.push(port);
      }
    });

    console.log("num of search filtered", filtered_ports.length);

    return filtered_ports;
  }

  render() {
    const {
      search_text,

      live_reload,
      ports,
      processID_visibility,
      process_name_visibility,
      socket_type_visibility,

      popup_open,

      popup_port_start,
      popup_port_end,
      popup_processID_visibility,
      popup_process_name_visibility,
      popup_socket_type_visibility,

      filter_applying,

      data_fetching,
    } = this.state;

    console.log("filter with", search_text);

    let search_filtered_ports = this.searchFilter(search_text, ports);

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
                <input
                  type="text"
                  value={search_text}
                  onChange={(event) => {
                    this.setState({
                      search_text: event.target.value,
                    });
                    console.log("on change", event.target.value);
                  }}
                  placeholder="Search..."
                />

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
                onOpen={this.popupOpen}
                onClose={this.popupClose}
                position="bottom right"
                open={popup_open}
              >
                <div className="filter-container-popup">
                  {/* start/end port */}
                  <div className="port-filter-container">
                    <span>Port</span>
                    <div className="port-number-input-container">
                      <input
                        type="number"
                        min={0}
                        placeholder="Port number"
                        value={popup_port_start}
                        onChange={(event) => {
                          this.setState({
                            popup_port_start: Number(event.target.value),
                          });
                        }}
                      />
                    </div>
                    <span>to</span>
                    <div className="port-number-input-container">
                      <input
                        type="number"
                        min={0}
                        placeholder="Port number"
                        value={popup_port_end}
                        onChange={(event) => {
                          this.setState({
                            popup_port_end: Number(event.target.value),
                          });
                        }}
                      />
                    </div>
                  </div>

                  {/* visible columns */}
                  <div className="column-filter-container">
                    <div>
                      <input
                        id="column-processid"
                        type="checkbox"
                        checked={popup_processID_visibility}
                        onChange={() => {
                          this.setState({
                            popup_processID_visibility:
                              !popup_processID_visibility,
                          });
                        }}
                      />
                      <label htmlFor="column-processid">Process ID</label>
                    </div>

                    <div>
                      <input
                        id="column-processname"
                        type="checkbox"
                        checked={popup_process_name_visibility}
                        onChange={() => {
                          this.setState({
                            popup_process_name_visibility:
                              !popup_process_name_visibility,
                          });
                        }}
                      />
                      <label htmlFor="column-processname">Process Name</label>
                    </div>

                    <div>
                      <input
                        id="column-sockettype"
                        type="checkbox"
                        checked={popup_socket_type_visibility}
                        onChange={() => {
                          this.setState({
                            popup_socket_type_visibility:
                              !popup_socket_type_visibility,
                          });
                        }}
                      />
                      <label htmlFor="column-sockettype">Socket Type</label>
                    </div>
                  </div>

                  {/* apply/cancel actions */}
                  <div className="actions">
                    {filter_applying == true ? (
                      <Oval
                        height={25}
                        width={25}
                        color="#7670fa"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#9f9eb3"
                        strokeWidth={5}
                        strokeWidthSecondary={5}
                      />
                    ) : (
                      <>
                        <div
                          className="cancel-button clickable"
                          onClick={this.cancelTableFilter.bind(this)}
                        >
                          <span>Cancel</span>
                        </div>

                        <div
                          className="apply-button clickable"
                          onClick={this.applyTableFilter.bind(this)}
                        >
                          <span>Apply</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Popup>

              <div className="space"></div>

              {data_fetching == true && (
                <div className="data-loading">
                  <Oval
                    height={20}
                    width={20}
                    color="#7670fa"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#9f9eb3"
                    strokeWidth={5}
                    strokeWidthSecondary={5}
                  />
                </div>
              )}

              {/* refresh */}
              {!live_reload && (
                <div className="refresh-container clickable">
                  <img
                    className="clickable-icon"
                    src={RefreshSVG}
                    alt="Refresh icon"
                    onClick={this.refreshTable.bind(this)}
                  />
                </div>
              )}

              {/* table-info */}
              <div className="table-info-container">
                <span>Showing {search_filtered_ports.length} items</span>
              </div>
            </div>

            <div className="tables-container">
              <div className="table-container">
                {ports && ports.length > 0 && (
                  <CustomTable
                    processID_visibility={processID_visibility}
                    process_name_visibility={process_name_visibility}
                    socket_type_visibility={socket_type_visibility}
                    data={search_filtered_ports}
                  />
                )}
              </div>

              {/* HIDING FEATURE
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
                  {ports && ports.length > 0 && (
                    <CustomTable
                      processID_visibility={processID_visibility}
                      process_name_visibility={process_name_visibility}
                      socket_type_visibility={socket_type_visibility}
                      data={ports}
                    />
                  )}
                </div>
              </div> 
              */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
