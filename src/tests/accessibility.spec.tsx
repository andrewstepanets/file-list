import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FileList } from '../components/file-list';
import { FileDetails } from '../types/file-details';

expect.extend(toHaveNoViolations);

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

describe('FileList component accessibility', () => {
  it('should pass accessibility check', async () => {
    const { container } = render(<FileList files={mockFiles} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
