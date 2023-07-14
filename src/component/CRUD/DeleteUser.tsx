import React from "react";
import { IData } from "../../InterFace/commonInterface";
import Button from '@mui/material/Button';

interface DeleteUserProps {
  user: IData | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ user, onCancel, onConfirm }) => {
  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup-content">
        <h4 className="confirm">Confirm Deletion</h4>
        <p>Are you sure you want to delete this user?</p>
        <div>
        <Button variant="contained" color="error" onClick={onConfirm}> Confirm</Button>
        &nbsp;
        &nbsp;
        <Button variant="contained" color="primary" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
