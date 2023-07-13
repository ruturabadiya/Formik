import React from "react";
import { IData } from "../../InterFace/commonInterface";

interface DeleteUserProps {
    user: IData | null;
    onCancel: () => void;
    onConfirm: () => void;
  }
  const DeleteUser: React.FC<DeleteUserProps> = ({ user, onCancel, onConfirm }) => {

  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup-content">
        <h4 className="conform">Confirm Deletion</h4>
        <p>Are you sure you want to delete this user?</p>
        <div>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>{" "}
          &nbsp;
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
