import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Table } from '../components/table';
import { FileDetails } from '../types/file-details';
import { Columns } from '../types/table';

const mockFiles: FileDetails[] = [
  {
    key: '1',
    name: 'smss.exe',
    device: 'Mario',
    path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
    status: 'scheduled',
  },
];

const columns: Columns<FileDetails>[] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Device', dataIndex: 'device', key: 'device' },
  { title: 'Path', dataIndex: 'path', key: 'path' },
];

describe('Table component', () => {
  it('should render with the correct columns and data', () => {
    render(<Table columns={columns} data={mockFiles} />);

    expect(screen.getByText('smss.exe')).toBeInTheDocument();
    expect(screen.getByText('Mario')).toBeInTheDocument();
    expect(
      screen.getByText('\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe')
    ).toBeInTheDocument();
  });

  it('should reflect selected rows when checkboxes are clicked', () => {
    const handleRowSelect = vi.fn();
    render(
      <Table
        columns={columns}
        data={mockFiles}
        withCheckboxes={true}
        selectedRows={[]}
        onRowSelect={handleRowSelect}
      />
    );

    const checkbox = screen.getByLabelText('Select row for smss.exe');
    fireEvent.click(checkbox);

    expect(handleRowSelect).toHaveBeenCalled();
  });
});
