"use client";

import CreateLinkForm from "../forms/create-link-form";
import Button from "./button";
import Modal from "./modal";

const CreateLinkContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-semibold">Create new link</h4>
        <p className="text-sm text-zinc-500">Create your new shortened link</p>
      </div>
      <CreateLinkForm />
    </div>
  );
};

const CreateLinkModal = () => {
  return (
    <Modal>
      <Modal.Open opens="CreateLinkModal">
        <Button fit small variant="dark">
          Create new
        </Button>
      </Modal.Open>
      <Modal.Window name="CreateLinkModal">
        {() => <CreateLinkContent />}
      </Modal.Window>
    </Modal>
  );
};

export default CreateLinkModal;
