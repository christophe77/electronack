export type Bot = {
  name: string;
  platform: string;
  id: number;
  socket: any;
  informations: {
    hostname: string;
    platform: string;
    arch: string;
    uptime: string;
  };
};
export type ServerStatus = { status: string; connected: boolean };
