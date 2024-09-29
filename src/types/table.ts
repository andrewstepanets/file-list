export interface Columns<T> {
  title: string;
  dataIndex: keyof T;
  key: string;
  render?: (text: T[keyof T], record: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Columns<T>[];
  data: T[];
  withCheckboxes?: boolean;
  withDownloadButton?: boolean;
  isDownloadDisabled?: boolean;
  selectedRows?: T[];
  onRowSelect?: (record: T) => void;
  onSelectAll?: (selectAll: boolean) => void;
  onDownload?: () => void;
}
