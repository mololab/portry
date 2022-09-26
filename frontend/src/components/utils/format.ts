import { Port } from "../types";

export function formatToUI(portsDataServer: any[]): Port[] {
  let uiPortData: Port[] = [];

  portsDataServer.forEach((portDataServer: { [key: string]: any }) => {
    uiPortData.push({
      port: portDataServer?.["LocalAddr"]?.["Port"] as string,
      process_id: portDataServer?.["Process"]?.["Pid"],
      process_name: portDataServer?.["Process"]?.["Name"],
      socket_type: portDataServer?.["SocketType"],
      controllers: {
        hided: false,
      },
    });
  });

  return uiPortData;
}
