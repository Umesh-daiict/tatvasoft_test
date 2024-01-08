import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/form";

export default function App() {
  const [search, setSearch] = useState("Firstname");
  const [inputState, setInputState] = useState("");
  const handleChange = (e: SelectChangeEvent) => {
    setSearch(e.target.value)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }

  return (
    <main>
      <Box sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '& .topsearch': { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }}>
        <Box className="topsearch">
          <FormControl fullWidth>
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
            required
            // error={showError.includes(item.name)}
            id="outlined-required"
            label={"search"}
            value={inputState}
            type={'text'}
            onChange={handleChangeInput}
          />
          <Button variant="contained" >
            Create
          </Button>
        </Box>
      </Box>
      <TableComponent />
      <FormComponent />
    </main>
  );
}