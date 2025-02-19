"use client";

import {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../../hooks/use-outside-click";

type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProps = {
  children: ReactNode;
};

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: ReactElement;
  opens: string;
};

function Open({ children, opens }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Open must be used within a Modal");

  return cloneElement(children, {
    onClick: () => context.open(opens),
  } as React.HTMLProps<HTMLElement>);
}

type WindowProps = {
  children: ReactElement;
  name: string;
};

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Window must be used within a Modal");

  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={ref}
        className="relative bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          <HiXMark className="w-6 h-6 text-zinc-500" />
        </button>
        <div>
          {cloneElement(children, { onCloseModal: close } as {
            onCloseModal: () => void;
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
