import { Box, Button, Modal } from "@mui/material"

const DeleteModel: React.FC<{ open: boolean; onDelete: () => void; onClose: () => void }> = ({ open, onDelete, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box>
                <h2>Are you sure you want to delete this? </h2>
                <Button onClick={onDelete}>Delete</Button>
            </Box>
        </Modal>)
}

export default DeleteModel;