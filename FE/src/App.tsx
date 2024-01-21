import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/Form";
import DeleteModel from "./components/DeleteForm";
import { StepData, formData } from "./components/types";

const debounceFetchSearch = (fn: () => void) => {
  let timerId: number | undefined;
  console.log("callled111222")

  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn()
    }, 1000)
  }
}
export default function App() {
  const [search, setSearch] = useState("Firstname");
  const [inputState, setInputState] = useState("");
  const [open, setOpen] = useState(false)
  const [dId, setDid] = useState<string | null>(null)
  const [step, setStep] = useState<StepData>({ page: 1, total: 1 })
  const [tableData, setTableData] = useState<formData[]>([]);
  const [updateData, setUpdateData] = useState<formData | null>(null)

  const handleOptSearch = useCallback(debounceFetchSearch(() => {
    fetch(`http://localhost:5000/user/search?row=${search}&value=${inputState}`, {
      method: 'POST',
    }).then((res) => {
      return res.json()
    }).then(data => {
      setTableData(data);
    }).catch((err) => {
      console.log(err)
    })
  }), [inputState, search])
  const handleChange = (e: SelectChangeEvent) => {
    setSearch(e.target.value)
    handleOptSearch()
  }

  const changeStep = (count: number) => {
    setStep((prev) => ({ ...prev, page: count }))
  }

  const handleUpdate = (data: formData) => { setOpen(true); setUpdateData(data) }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
    handleOptSearch()
  }

  const deleteItem = () => {
    fetch(`http://localhost:5000/user/${dId}`, {
      method: 'DELETE',
    }).then((res) => {
      return res.json()
    }).then(data => {
      setTableData(data.users)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    fetch(`http://localhost:5000/user?page=${step.page}&limit=10`, {
      method: 'GET',
    }).then((res) => {
      return res.json()
    }).then(data => {
      setTableData(data.doc);
    }).catch((err) => {
      console.log(err)
    })
  }, [step.page])

  useEffect(() => {
    fetch("http://localhost:5000/user/tot", {
      method: 'GET',
    }).then((res) => {
      return res.json()
    }).then(data => {
      setStep((prev) => ({ ...prev, total: data?.total || 1 }))
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  const handleClose = (data?: formData[]) => {
    setOpen(false);
    if (data?.length) {
      setTableData(data);
    }
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

          <Button variant="contained" onClick={() => { setUpdateData(null); setOpen(true) }} >
            Create
          </Button>
        </Box>
      </Box>
      <TableComponent step={step} handleUpdate={handleUpdate} changeStep={changeStep} setid={(id: string) => setDid(id)} data={tableData} />
      <FormComponent open={open} handleClose={handleClose} data={updateData} formType={updateData !== null ? "update" : "create"} />
      <DeleteModel open={dId != null} onDelete={deleteItem} onClose={() => setDid(null)} />
    </main>
  );
}