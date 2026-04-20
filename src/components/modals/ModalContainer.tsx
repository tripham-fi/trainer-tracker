import { Dialog, DialogContent } from '@mui/material';
import { useModal } from '../../ModalContext';

function ModalContainer() {
  const { isOpen, content, size, closeModal } = useModal();

  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth={size} fullWidth>
      <DialogContent sx={{ p: 3 }}>{content}</DialogContent>
    </Dialog>
  );
}

export default ModalContainer;
