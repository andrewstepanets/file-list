import { useState, useRef, useEffect } from 'react';
import { FileDetails } from '../types/file';
import { FaDownload } from 'react-icons/fa';

interface ComponentProps {
  files: FileDetails[];
}

export function FileList({ files }: ComponentProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileDetails[]>([]);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = (file: FileDetails) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter((f) => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]); // Deselect all
    } else {
      setSelectedFiles(files); // Select all
    }
  };

  const handleDownload = () => {
    const availableFiles = selectedFiles.filter(
      (file) => file.status === 'available'
    );
    if (availableFiles.length === 0) return;

    const paths = availableFiles.map(
      (file) => `Device: ${file.device}, Path: ${file.path}`
    );
    alert(paths.join('\n'));
  };

  // Set the indeterminate state for the "Select All" checkbox and toggle the CSS class
  useEffect(() => {
    if (selectAllRef.current) {
      const isIndeterminate =
        selectedFiles.length > 0 && selectedFiles.length < files.length;
      selectAllRef.current.indeterminate = isIndeterminate;

      // Apply custom CSS class for indeterminate state
      selectAllRef.current.classList.toggle('indeterminate', isIndeterminate);

      // Set checked state based on whether all items are selected or not
      selectAllRef.current.checked = selectedFiles.length === files.length;
    }
  }, [selectedFiles, files.length]);

  // Check if all selected files are available to enable the download button
  const areAllSelectedFilesAvailable = selectedFiles.every(
    (file) => file.status === 'available'
  );

  return (
    <div className='file-list'>
      <table className='file-list-table'>
        <thead>
          <tr>
            <th scope='col'>
              <input
                type='checkbox'
                className='custom-checkbox'
                ref={selectAllRef}
                onChange={toggleSelectAll}
                aria-label='Select All Files'
              />
            </th>
            <th scope='col'>
              <span>
                Selected{' '}
                {selectedFiles.length > 0 ? selectedFiles.length : 'None'}
              </span>
            </th>
            <th colSpan={3} scope='col'>
              <div className='download-container'>
                <button
                  onClick={handleDownload}
                  disabled={
                    !areAllSelectedFilesAvailable || selectedFiles.length === 0
                  }
                  aria-label='Download selected files'
                >
                  <FaDownload />
                </button>
                <span>Download Selected</span>
              </div>
            </th>
          </tr>
          <tr>
            <th></th>
            <th scope='col'>Name</th>
            <th scope='col'>Device</th>
            <th scope='col'>Path</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.name}
              className={selectedFiles.includes(file) ? 'selected' : ''}
            >
              <td>
                <input
                  type='checkbox'
                  checked={selectedFiles.includes(file)}
                  onChange={() => handleSelectFile(file)}
                  aria-label={`Select file ${file.name}`}
                />
              </td>
              <td>{file.name}</td>
              <td>{file.device}</td>
              <td>{file.path}</td>
              <td
                className={`status ${
                  file.status === 'available' ? 'status-available' : ''
                }`}
              >
                <span
                  className={
                    file.status === 'available'
                      ? 'status-available-text'
                      : 'status-scheduled-text'
                  }
                >
                  {file.status === 'available' ? 'Available' : 'Scheduled'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
