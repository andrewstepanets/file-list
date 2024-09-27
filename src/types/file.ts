type Status = 'available' | 'scheduled';

export interface FileDetails {
  name: string;
  device: string;
  path: string;
  status: Status;
}
