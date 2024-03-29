export interface Column {
  name: string;
}

export interface Port {
  port: string;
  process_id?: string;
  process_name?: string;
  socket_type?: string;
  controllers: {
    hided: boolean;
  };
}
