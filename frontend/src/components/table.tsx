import React from "react";
import { Column, PortInfo } from "./types";
import EyeONSVG from "../assets/svg/eye-on.svg";
import EyeOFFSVG from "../assets/svg/eye.svg";
import MoreSVG from "../assets/svg/more.svg";
import XSVG from "../assets/svg/x.svg";
import { Popup } from "semantic-ui-react";

interface CustomTableProps {}

interface CustomTableState {
  columns: Column[];
  data: PortInfo[];
}

export default class CustomTable extends React.Component<
  CustomTableProps,
  CustomTableState
> {
  constructor(props: CustomTableProps) {
    super(props);

    this.state = {
      columns: [
        { name: "Port", visible: true },
        { name: "Process ID", visible: true },
        { name: "Process Name", visible: true },
        { name: "Socket Type", visible: true },
      ],
      data: [
        {
          port: ":5000",
          process_id: `5265`,
          process_name: `React.exe`,
          socket_type: `TCP`,
          controllers: {
            hided: false,
          },
        },
        {
          port: ":5001",
          process_id: `5266`,
          process_name: `Valorant.exe`,
          socket_type: `TCP6`,
          controllers: {
            hided: false,
          },
        },
        {
          port: ":5001",
          process_id: `5266`,
          process_name: `Valorant.exe`,
          socket_type: `TCP6`,
          controllers: {
            hided: false,
          },
        },
        {
          port: ":5001",
          process_id: `5266`,
          process_name: `Valorant.exe`,
          socket_type: `TCP6`,
          controllers: {
            hided: false,
          },
        },
        {
          port: ":5001",
          process_id: `5266`,
          process_name: `Valorant.exe`,
          socket_type: `TCP6`,
          controllers: {
            hided: false,
          },
        },
        {
          port: ":5001",
          process_id: `5266`,
          process_name: `Valorant.exe`,
          socket_type: `TCP6`,
          controllers: {
            hided: false,
          },
        },
        {
          port: ":5001",
          process_id: `5266`,
          process_name: `Valorant.exe`,
          socket_type: `TCP6`,
          controllers: {
            hided: false,
          },
        },
      ],
    };
  }

  render() {
    const { columns, data } = this.state;

    return (
      <>
        <div className="table-data-container">
          <div className="title-container">
            {columns.map((column) => (
              <span>{column.name}</span>
            ))}
            <span></span>
          </div>

          <div className="contents-container">
            {data.map((singleData) => {
              return (
                <div className="row">
                  <>
                    {Object.keys(singleData).map((key) => {
                      let columnData = (singleData as any)[key];
                      if (typeof columnData == "string") {
                        return <span>{columnData}</span>;
                      }
                    })}

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
