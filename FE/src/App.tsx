import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/Form";


export default function App() {
  const [search, setSearch] = useState("Firstname");
  const [inputState, setInputState] = useState("");
  const [open, setOpen] = useState(false)
  const handleChange = (e: SelectChangeEvent) => {
    setSearch(e.target.value)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }

  return (
    <main>
      <Box sx={{
        '& .nav': {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        },
        '& .topsearch': {
          display: 'flex',
          alignItems: 'center',
          marginRight: "8px",
        },

        "& .rowselect": {
          marginLeft: "8px",

        },
        "& .rowinput": {
          marginLeft: "8px",
        }

      }}>
        <Box className="nav">
          <Box className="topsearch">
            <FormControl className="rowselect" >
            <Select
              value={search}
              onChange={handleChange}
            >
              {[
                { id: 1, name: 'Firstname' },
                { id: 2, name: 'Lastname' },
                { id: 3, name: 'Email', },
                { id: 4, name: 'Phone', },
              ].map(item => {
                return (<MenuItem value={item.name}>{item.name}</MenuItem>)
              })}
            </Select>
          </FormControl>
            <TextField
              className="rowinput"
            required
            // error={showError.includes(item.name)}
            id="outlined-required"
            label={"search"}
            value={inputState}
            type={'text'}
            onChange={handleChangeInput}
            />
          </Box>

          <Button variant="contained" onClick={() => setOpen(true)} >
            Create
          </Button>
        </Box>
      </Box>
      <TableComponent />
      <FormComponent open={open} handleClose={() => setOpen(false)} />
    </main>
  );
}