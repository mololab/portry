import { FetchPorts } from "../../../wailsjs/go/main/App";

export async function fetchPortsFromServer(): Promise<any[]> {
  return await FetchPorts();
}
