import React from "react";
import { Column, Port } from "./types";
import EyeONSVG from "../assets/svg/eye-on.svg";
import EyeOFFSVG from "../assets/svg/eye.svg";
import MoreSVG from "../assets/svg/more.svg";
import XSVG from "../assets/svg/x.svg";
import { Popup } from "semantic-ui-react";

interface CustomTableProps {
  data: Port[];
  processID_visibility: boolean;
  process_name_visibility: boolean;
  socket_type_visibility: boolean;
}

interface CustomTableState {
  columns: Column[];
  data: Port[];
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
      data: this.props.data,
    };
  }

  render() {
    const { columns, data } = this.state;
    const {
      processID_visibility,
      process_name_visibility,
      socket_type_visibility,
    } = this.props;

    console.log("-------------------");
    console.log("processID_visibility", processID_visibility);
    console.log("process_name_visibility", process_name_visibility);
    console.log("socket_type_visibility", socket_type_visibility);

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
                              <div className="popup-element kill-element">
                                <img src={XSVG} alt="Kill process" />
                                <span>Kill</span>
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
