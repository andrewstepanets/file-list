import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FileList } from '../components/file-list';
import { FileDetails } from '../types/file-details';

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
  {
    name: 'uxtheme.dll',
    device: 'Peach',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
    status: 'available',
  },
  {
    name: 'aries.sys',
    device: 'Daisy',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys',
    status: 'scheduled',
  },
  {
    name: 'cryptbase.dll',
    device: 'Yoshi',
    path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
    status: 'scheduled',
  },
  {
    name: '7za.exe',
    device: 'Toad',
    path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
    status: 'scheduled',
  },
];

describe('FileList component', () => {
  it('verify the component renders without crashing', () => {
    render(<FileList files={mockFiles} />);
    expect(screen.getByText('Download Selected')).toBeInTheDocument();
  });

  it('should correctly reflect selected count and disable Download button for scheduled files', () => {
    render(<FileList files={mockFiles} />);

    const firstCheckbox = screen.getByLabelText('Select row for smss.exe'); // scheduled
    const secondCheckbox = screen.getByLabelText('Select row for netsh.exe'); // available
    const thirdCheckbox = screen.getByLabelText('Select row for uxtheme.dll'); // available
    const downloadButton = screen.getByRole('button', {
      name: 'Download selected files',
    });

    // Initially no files selected, "None Selected" text, download button disabled
    expect(screen.getByText('Selected None')).toBeInTheDocument();
    expect(downloadButton).toBeDisabled();

    // Select first (scheduled) -> download button should still be disabled
    fireEvent.click(firstCheckbox);
    expect(screen.getByText('Selected 1')).toBeInTheDocument();
    expect(downloadButton).toBeDisabled();

    // Select second (available) -> download button should be disabled
    fireEvent.click(secondCheckbox);
    expect(screen.getByText('Selected 2')).toBeInTheDocument();
    expect(downloadButton).toBeDisabled();

    // Deselect first (disabled) and select third (available) -> download button should be enabled
    fireEvent.click(firstCheckbox);
    fireEvent.click(thirdCheckbox);
    expect(downloadButton).toBeEnabled();
  });

  it('verify that the modal opens with selected available files when clicking "Download Selected"', () => {
    render(<FileList files={mockFiles} />);

    const secondCheckbox = screen.getByLabelText('Select row for netsh.exe');
    const thirdCheckbox = screen.getByLabelText('Select row for uxtheme.dll');
    const downloadButton = screen.getByRole('button', {
      name: 'Download selected files',
    });

    fireEvent.click(secondCheckbox);
    fireEvent.click(thirdCheckbox);
    fireEvent.click(downloadButton);

    // Target the modal specifically
    const modal = screen.getByRole('dialog');
    expect(within(modal).getByText('Selected Files')).toBeInTheDocument();
    expect(within(modal).getByText('Luigi')).toBeInTheDocument();
    expect(within(modal).getByText('Peach')).toBeInTheDocument();
    expect(
      within(modal).getByText(
        '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe'
      )
    ).toBeInTheDocument();
    expect(
      within(modal).getByText(
        '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll'
      )
    ).toBeInTheDocument();
  });

  it('should properly display status with corresponding class names', () => {
    render(<FileList files={mockFiles} />);
    const availableStatus = screen.getAllByText('Available');
    const scheduledStatus = screen.getAllByText('Scheduled');

    // Verify the correct classes for the status elements
    availableStatus.forEach((status) => {
      expect(status).toHaveClass('status-available');
    });

    scheduledStatus.forEach((status) => {
      expect(status).toHaveClass('status-scheduled');
    });
  });
});
