import React from "react";
import Button from "../ui/Button";

const DeleteModal = ({
  open,
  title,
  loading,
  onCancel,
  onDelete,
}) => {

  if(!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

      <div className="w-full max-w-md rounded-2xl bg-card p-8">

        <h2 className="text-2xl font-bold p-2">

          Delete

        </h2>

        <p className="mt-4 text-muted-foreground">

          Delete "{title}" ?

        </p>

        <div className="mt-8 flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700 rouded-md p-2"
            onClick={onDelete}
          >
            {
              loading
              ? "Deleting..."
              : "Delete"
            }
          </Button>

        </div>

      </div>

    </div>

  );

};

export default DeleteModal;