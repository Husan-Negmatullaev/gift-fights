import ReactModal from 'react-modal';
import { Icons } from '../icons/icons';
import type { ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  onClose(): void;
  children: ReactNode;
};

export const Modal = (props: ModalProps) => {
  const { open, onClose } = props;

  return (
    <ReactModal
      isOpen={open}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      className={{
        afterOpen: '',
        beforeClose: '',
        base: 'basis-100 relative bg-dark-blue-800 rounded-2.5xl p-3',
      }}
      portalClassName=""
      htmlOpenClassName=""
      bodyOpenClassName=""
      overlayClassName="p-4 fixed inset-0 bg-black/60 flex justify-center items-center">
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer bg-dark/8 rounded-full absolute top-3 right-3">
        <Icons name="cross" width={24} height={24} className="text-dark/40" />
      </button>

      <></>
    </ReactModal>
  );
};
