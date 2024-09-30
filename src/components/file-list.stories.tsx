import React from 'react';
import { FileList } from './file-list';
import { FileDetails } from '../types/file-details';

import '../styles/custom.scss';

export default {
  title: 'Components/FileList',
  component: FileList,
  parameters: {
    a11y: {
      disable: false,
    },
  },
};

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

export const Default = () => <FileList files={mockFiles} />;
