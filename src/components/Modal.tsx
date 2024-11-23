import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-labelledby="modal-title" aria-modal="true">
      <div>
        <h2 id="modal-title">{title}</h2>
        <button onClick={onClose} aria-label="Close">
          Close
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};
