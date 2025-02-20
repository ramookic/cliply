"use client";

import { deleteLinkAction } from "@/lib/actions";
import Button from "./button";
import Modal from "./modal";

type DeleteLinkModalProps = {
  id: number;
};

const DeleteLinkContent: React.FC<{ onCloseModal: () => void; id: number }> = ({
  onCloseModal,
  id,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-semibold">Delete link?</h4>
        <p className="text-sm text-zinc-500">
          Are you sure you want to delete this link?
        </p>
      </div>
      <Button
        variant="danger"
        onClick={async () => {
          await deleteLinkAction(id);
          onCloseModal();
        }}
      >
        Delete
      </Button>
    </div>
  );
};

const DeleteLinkModal: React.FC<DeleteLinkModalProps> = ({ id }) => {
  return (
    <Modal>
      <Modal.Open opens="deleteLinkModal">
        <Button small variant="danger">
          Delete
        </Button>
      </Modal.Open>
      <Modal.Window name="deleteLinkModal">
        {(onCloseModal) => (
          <DeleteLinkContent id={id} onCloseModal={onCloseModal} />
        )}
      </Modal.Window>
    </Modal>
  );
};

export default DeleteLinkModal;
