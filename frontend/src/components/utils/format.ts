import { Port } from "../types";

export function FormatToUI(portsDataServer: any[]): Port[] {
  let uiPortData: Port[] = [];

  portsDataServer.forEach((portDataServer: { [key: string]: any }) => {
    uiPortData.push({
      port: undefinedCheck(portDataServer?.["LocalAddr"]?.["Port"] as string),
      process_id: undefinedCheck(
        portDataServer?.["Process"]?.["Pid"] as string
      ),
      process_name: undefinedCheck(portDataServer?.["Process"]?.["Name"]),
      socket_type: undefinedCheck(portDataServer?.["SocketType"]),
      controllers: {
        hided: false,
      },
    });
  });

  return uiPortData;
}

function undefinedCheck(text: any): string {
  if (text == undefined) {
    return "-";
  }
  return String(text);
}
