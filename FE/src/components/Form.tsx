import { Button, Checkbox, FormControlLabel } from '@mui/material';
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

export default function FormPropsTextFields() {
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
            console.log(formState, "fof", formState);
            fetch("http://localhost:5000/user/create", {
                method: 'POST',
                body: JSON.stringify(formState)
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
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .form1': { m: 1, width: '25ch', display: 'grid' },

            }}
            noValidate
            autoComplete="off"
        >
            <div className='form1'>
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

                <Button onClick={onSubmitForm}>Create </Button>
            </div>
        </Box>
    );
}
