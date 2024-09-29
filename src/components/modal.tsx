import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className='modal-backdrop'>
      <div className='modal' role='dialog' aria-labelledby='modal-title'>
        <div className='modal-header'>
          <h2 id='modal-title'>{title}</h2>
          <button
            className='modal-close'
            onClick={onClose}
            aria-label='Close modal'
          >
            <FaTimes role='presentation' />
          </button>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
}
