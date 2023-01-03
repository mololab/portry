import { fetchPortsFromServer } from "./utils/server";
import { FormatToUI } from "./utils/format";
import { Port } from "./types";

export async function GetPorts(): Promise<Port[]> {
  let portsFromServer = await fetchPortsFromServer();

  let formattedPortsForUI = FormatToUI(portsFromServer);

  return formattedPortsForUI;
}
