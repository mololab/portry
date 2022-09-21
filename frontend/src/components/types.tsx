export interface Column {
  name: string;
  visible: boolean;
}

export interface PortInfo {
  port: string;
  process_id?: string;
  process_name?: string;
  socket_type?: string;
  controllers: {
    hided: boolean;
  };
}
