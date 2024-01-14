import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/Form";
import DeleteModel from "./components/DeleteForm";


export default function App() {
  const [search, setSearch] = useState("Firstname");
  const [inputState, setInputState] = useState("");
  const [open, setOpen] = useState(false)
  const [dId, setDid] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<any[]>([]);

  const handleChange = (e: SelectChangeEvent) => {
    setSearch(e.target.value)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }
  const deleteItem = () => {
    fetch(`http://localhost:5000/user/${dId}`, {
      method: 'DELETE',
    }).then((res) => {
      return res.json()
    }).then(data => {
      console.log("data", data)
      setTableData(data.users)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    fetch("http://localhost:5000/user", {
      method: 'GET',
    }).then((res) => {
      return res.json()
    }).then(data => {
      setTableData(data.doc);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

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
      <TableComponent setid={(id: string) => setDid(id)} data={tableData} />
      <FormComponent open={open} handleClose={() => setOpen(false)} />
      <DeleteModel open={dId != null} onDelete={deleteItem} onClose={() => setDid(null)} />
    </main>
  );
}