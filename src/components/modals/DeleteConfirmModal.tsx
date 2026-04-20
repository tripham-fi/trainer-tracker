import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useModal } from "../../ModalContext";

type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({ title, message, onConfirm }: Props) {
  const { closeModal } = useModal();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </>
  );
}