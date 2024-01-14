import { Box, Button, Modal } from "@mui/material"

const DeleteModel: React.FC<{ open: boolean; onDelete: () => void; onClose: () => void }> = ({ open, onDelete, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ backgroundColor: "white", justifyContent: "center", width: "50%", position: "absolute", top: "35%", left: "20%" }}>
                <h2 style={{ display: "flex", justifyContent: "center" }}>Are you sure you want to delete this? </h2>
                <Button sx={{ display: "flex", marginLeft: "auto", marginRight: "10rem" }} onClick={() => { onDelete(); onClose(); }}>Delete</Button>
            </Box>
        </Modal>)
}

export default DeleteModel;