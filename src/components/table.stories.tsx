import React from 'react';
import { Table } from './table';
import { FileDetails } from '../types/file-details';
import { Columns } from '../types/table';

import '../styles/custom.scss';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    a11y: {
      disable: false,
    },
  },
};

const columns: Columns<FileDetails>[] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Device', dataIndex: 'device', key: 'device' },
  { title: 'Path', dataIndex: 'path', key: 'path' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string | undefined) => (
      <span
        className={`status ${
          status === 'available' ? 'status-available' : 'status-scheduled'
        }`}
      >
        {status === 'available' && (
          <span className='status-indicator' aria-hidden='true'></span>
        )}
        {status === 'available' ? 'Available' : 'Scheduled'}
      </span>
    ),
  },
];

const mockFiles: FileDetails[] = [
  {
    name: 'smss.exe',
    device: 'Mario',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
    status: 'scheduled',
  },
  {
    name: 'netsh.exe',
    device: 'Luigi',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
    status: 'available',
  },
];

export const Default = () => (
  <Table<FileDetails>
    columns={columns}
    data={mockFiles}
    withCheckboxes={false}
    withDownloadButton={false}
  />
);

export const WithCheckboxes = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<FileDetails[]>([]);

  const handleSelectFile = (file: FileDetails) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter((f) => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedFiles(mockFiles);
    } else {
      setSelectedFiles([]);
    }
  };

  return (
    <Table<FileDetails>
      columns={columns}
      data={mockFiles}
      withCheckboxes={true}
      selectedRows={selectedFiles}
      onRowSelect={handleSelectFile}
      onSelectAll={handleSelectAll}
    />
  );
};

export const WithDownloadButton = () => {
  const handleDownload = () => {
    alert('Download triggered!');
  };

  return (
    <Table<FileDetails>
      columns={columns}
      data={mockFiles}
      withCheckboxes={false}
      withDownloadButton={true}
      isDownloadDisabled={false}
      onDownload={handleDownload}
    />
  );
};
