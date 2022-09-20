import React from "react";
import { Column, PortInfo } from "./types";

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
        { name: "", visible: true },
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
          </div>

          <div className="contents-container">
            {data.map((singleData) => {
              return (
                <div className="row">
                  <span>{singleData.port}</span>
                  <span>{singleData.process_id}</span>
                  <span>{singleData.process_name}</span>
                  <span>{singleData.socket_type}</span>
                  <span>{String(singleData.controllers.hided)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
