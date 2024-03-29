import React from "react";
import { Column, Port } from "../utils/types";
import EyeONSVG from "../assets/svg/eye-on.svg";
import EyeOFFSVG from "../assets/svg/eye.svg";
import MoreSVG from "../assets/svg/more.svg";
import XSVG from "../assets/svg/x.svg";
import { Popup } from "semantic-ui-react";
import { KillProcess } from "../../wailsjs/go/main/App";

interface CustomTableProps {
  data: Port[];
  processID_visibility: boolean;
  process_name_visibility: boolean;
  socket_type_visibility: boolean;

  fetchPorts: any;
}

interface CustomTableState {
  columns: Column[];
}

export default class CustomTable extends React.Component<
  CustomTableProps,
  CustomTableState
> {
  constructor(props: CustomTableProps) {
    super(props);

    console.log("props", props);

    this.state = {
      columns: [
        { name: "Port" },
        { name: "Process ID" },
        { name: "Process Name" },
        { name: "Socket Type" },
      ],
    };
  }

  killProcess(process_name: string, process_id: string, port: string) {
    KillProcess(process_name, process_id, port)
      .then((result) => {
        this.props.fetchPorts();
        console.log("result", result);
      })
      .catch((err) => {
        console.error(`ERROR`, err);
      });
  }

  render() {
    const { columns } = this.state;
    const {
      data,
      processID_visibility,
      process_name_visibility,
      socket_type_visibility,
    } = this.props;

    return (
      <>
        <div className="table-data-container">
          <div className="title-container">
            <span>{columns[0].name}</span>
            {processID_visibility == true && <span>{columns[1].name}</span>}
            {process_name_visibility == true && <span>{columns[2].name}</span>}
            {socket_type_visibility == true && <span>{columns[3].name}</span>}
            <span></span>
          </div>

          <div className="contents-container">
            {data.map((singleData) => {
              return (
                <div className="row clickable">
                  <>
                    <span>{singleData.port}</span>
                    {processID_visibility == true && (
                      <span>{singleData.process_id}</span>
                    )}
                    {process_name_visibility == true && (
                      <span>{singleData.process_name}</span>
                    )}
                    {socket_type_visibility == true && (
                      <span>{singleData.socket_type}</span>
                    )}
                    <span>
                      <div className="row-controller">
                        {/* 
                        <div className="hide-status">
                          {singleData.controllers.hided == true ? (
                            <img
                              className="clickable-icon"
                              src={EyeOFFSVG}
                              alt="Shown"
                            />
                          ) : (
                            <img
                              className="clickable-icon"
                              src={EyeONSVG}
                              alt="Hidden"
                            />
                          )}
                        </div> 
                        */}

                        <div className="more-container">
                          <Popup
                            trigger={
                              <img
                                className="clickable-icon"
                                src={MoreSVG}
                                alt="More icon"
                              />
                            }
                            flowing
                            on="click"
                            position="left center"
                          // open={undefined} // false // true
                          >
                            <div className="more-container-popup">
                              <div
                                className="popup-element kill-element"
                                onClick={this.killProcess.bind(
                                  this,
                                  String(singleData.process_name),
                                  String(singleData.process_id),
                                  String(singleData.port)
                                )}
                              >
                                <img src={XSVG} alt="Kill process" />
                                <span>
                                  Kill
                                  <span className="bold">
                                    {singleData.process_name}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </Popup>
                        </div>
                      </div>
                    </span>
                  </>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
