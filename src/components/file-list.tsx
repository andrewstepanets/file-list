import { useState } from 'react';
import { Table } from './table';
import { FileDetails } from '../types/file-details';
import { Modal } from './modal';
import { Columns } from '../types/table';

interface ComponentProps {
  files: FileDetails[];
}

export function FileList({ files }: ComponentProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectFile = (file: FileDetails) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter((f) => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedFiles(files);
    } else {
      setSelectedFiles([]);
    }
  };

  const handleDownload = () => {
    setIsModalOpen(true);
  };

  // Update logic for enabling the download button
  const isDownloadDisabled =
    selectedFiles.length === 0 ||
    selectedFiles.some((file) => file.status !== 'available');

  // Modify the columns definition to apply `status-available` or `status-scheduled` classes
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
          {status === 'available' ? 'Available' : 'Scheduled'}
        </span>
      ),
    },
  ];

  return (
    <div className='file-list'>
      <Table<FileDetails>
        columns={columns}
        data={files}
        withCheckboxes={true}
        withDownloadButton={true}
        selectedRows={selectedFiles}
        onRowSelect={handleSelectFile}
        onSelectAll={handleSelectAll}
        onDownload={handleDownload}
        isDownloadDisabled={isDownloadDisabled}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title='Selected Files'>
          <Table columns={columns.slice(1, 3)} data={selectedFiles} />
        </Modal>
      )}
    </div>
  );
}
