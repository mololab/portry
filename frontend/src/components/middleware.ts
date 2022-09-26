import { fetchPortsFromServer } from "./utils/server";
import { formatToUI } from "./utils/format";
import { Port } from "./types";

export async function GetPorts(): Promise<Port[]> {
  let portsFromServer = await fetchPortsFromServer();

  let formattedPortsForUI = formatToUI(portsFromServer);

  return formattedPortsForUI;
}
