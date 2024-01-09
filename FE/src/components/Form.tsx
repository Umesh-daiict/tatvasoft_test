import { Button, Checkbox, FormControlLabel, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const FormData: { id: number, name: 'Firstname' | 'Lastname' | 'Email' | 'Phone', type?: string }[] = [
    { id: 1, name: 'Firstname' },
    { id: 2, name: 'Lastname' },
    { id: 3, name: 'Email', type: 'email' },
    { id: 4, name: 'Phone', type: 'tel' },
]
interface formField { Firstname: string, Lastname: string, Email: string, Phone: string, Status: boolean }

interface FormComponentProps {
    open: boolean;
    handleClose: () => void;
    formType?: 'create' | 'update'
}


const FormComponent: React.FC<FormComponentProps> = ({ open, handleClose, formType = 'create' }) => {
    const [formState, setFormState] = useState<formField>({ Firstname: '', Lastname: '', Email: '', Phone: '', Status: false });
    const [showError, setShowError] = useState<string[]>([]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length > 0) {
            setShowError((prev) => prev.filter(item => item !== e.target.name))
        }

        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.name", e.target.name, e.target.value, e.target.checked)
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.checked }))

    }
    const onSubmitForm = () => {
        const currErr = [...showError];
        FormData.forEach((item) => {
            if (formState[item.name].trim().length < 1) {
                currErr.push(item.name);
            }
        })
        setShowError(currErr);
        if (currErr.length == 0) {
            fetch("http://localhost:5000/user/create", {
                method: 'POST',
                body: JSON.stringify(formState),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                return res.json()
            }).then(data => {
                console.log("data", data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                            '& .form1': { m: 1, width: '25ch', display: 'grid' },
                        }}
                        style={{ display: 'flex', justifyContent: "center" }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='form1'>
                            <Box style={{ display: 'flex', justifyContent: "center" }}
                                component={'h2'}>{formType == 'create' ? "Create User" : "Update User"}</Box>
                            {FormData.map((item) => {
                                return (<TextField
                                    key={item.id}
                                    required
                                    error={showError.includes(item.name)}
                                    id="outlined-required"
                                    label={item.name}
                                    name={item.name}
                                    value={formState[`${item.name}`]}
                                    type={item.type || 'text'}
                                    onChange={handleChange}
                                />);
                            })}
                            <FormControlLabel control={<Checkbox name={'Status'} checked={formState.Status} onChange={handleCheck} />} label="Status (Active/Inactive)" />

                            <Button onClick={onSubmitForm}>{formType == 'create' ? "Create" : 'Update'} </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default FormComponent;