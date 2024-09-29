import { useRef, useEffect } from 'react';
import { TableProps } from '../types/table';
import { FaDownload } from 'react-icons/fa';
import { generateRowKey } from '../utils/unique-key-utils';

export function Table<T>({
  columns,
  data,
  withCheckboxes = false,
  selectedRows = [],
  withDownloadButton = false,
  isDownloadDisabled = true,
  onRowSelect,
  onSelectAll,
  onDownload,
}: TableProps<T>) {
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      const isIndeterminate =
        selectedRows.length > 0 && selectedRows.length < data.length;
      selectAllRef.current.indeterminate = isIndeterminate;
      selectAllRef.current.classList.toggle('indeterminate', isIndeterminate);
      selectAllRef.current.checked = selectedRows.length === data.length;
    }
  }, [selectedRows, data.length]);

  return (
    <table className='table'>
      <thead>
        <tr>
          {withCheckboxes && (
            <>
              <th>
                <input
                  type='checkbox'
                  ref={selectAllRef}
                  className='custom-checkbox'
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  aria-label='Select all rows'
                />
              </th>
              <th>
                <span>
                  Selected{' '}
                  {selectedRows.length > 0 ? selectedRows.length : 'None'}
                </span>
              </th>
            </>
          )}
          {withDownloadButton && (
            <th colSpan={columns.length - 1}>
              <div className='download-container'>
                <button
                  onClick={onDownload}
                  disabled={isDownloadDisabled}
                  aria-label='Download selected files'
                >
                  <FaDownload role='presentation' />
                </button>
                <span>Download Selected</span>
              </div>
            </th>
          )}
        </tr>
        <tr>
          {withCheckboxes && (
            <th scope='col'>
              <span className='sr-only'>Select</span>
              {/* Hidden but accessible label */}
            </th>
          )}
          {columns.map((col) => (
            <th key={col.key} scope='col'>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={generateRowKey(item, columns)}
            className={selectedRows.includes(item) ? 'selected' : ''}
          >
            {withCheckboxes && (
              <td>
                <input
                  type='checkbox'
                  checked={selectedRows.includes(item)}
                  onChange={() => onRowSelect?.(item)}
                  aria-label={`Select row for ${item[columns[0].dataIndex]}`}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key}>
                {col.render
                  ? col.render(item[col.dataIndex], item)
                  : String(item[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
