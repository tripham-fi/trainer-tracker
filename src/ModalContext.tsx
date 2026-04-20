import { createContext, useContext, useState, type ReactNode } from "react";
import type { ModalContextType, ModalSize } from "./types";

const initialState: ModalContextType = {
  openModal: () => {},
  closeModal: () => {},
  isOpen: false,
  content: null,
  size: 'md',
};

const ModalContext = createContext<ModalContextType>(initialState);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [size, setSize] = useState<ModalSize>("md");

  const openModal = (modalContent: ReactNode, modalSize: ModalSize = "md") => {
    setContent(modalContent);
    setSize(modalSize);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent(null);
  };

  const value: ModalContextType = {
    openModal,
    closeModal,
    isOpen,
    content,
    size,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};


/*
Reference: https://github.com/tripham-fi/oms/blob/master/clients/src/api/modalStore.ts (React TS + Mobx)
Article Reference: https://opensource.com/article/21/5/global-modals-react
*/