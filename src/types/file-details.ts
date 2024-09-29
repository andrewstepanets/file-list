type Status = 'available' | 'scheduled';

export interface FileDetails {
  key?: string;
  name: string;
  device: string;
  path: string;
  status: Status;
}
