import { Port } from "../types";

export function FormatToUI(portsDataServer: any[]): Port[] {
  let uiPortData: Port[] = [];

  portsDataServer.forEach((portDataServer: { [key: string]: any }) => {
    uiPortData.push({
      port: undefinedCheck(portDataServer?.["Port"] as string),
      process_id: undefinedCheck(portDataServer?.["ProcessID"] as string),
      process_name: undefinedCheck(portDataServer?.["ProcessName"]),
      socket_type: undefinedCheck(portDataServer?.["SocketType"]),
      controllers: {
        hided: false,
      },
    });
  });

  return uiPortData;
}

function undefinedCheck(text: any): string {
  if (text == undefined || text == "") {
    return "-";
  }
  return String(text);
}
