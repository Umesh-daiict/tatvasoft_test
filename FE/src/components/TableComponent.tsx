import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton, Pagination } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { TableComponentProps } from './types';

const TableComponent: React.FC<TableComponentProps> = ({ setid, data, handleUpdate, changeStep }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {[
                { id: 1, name: 'Firstname' },
                { id: 2, name: 'Lastname' },
                { id: 3, name: 'Email', },
                { id: 4, name: 'Phone', },
                { id: 5, name: 'Status', },
                { id: 6, name: 'Actions', },
              ].map(cell => {
                return (<TableCell key={cell.id} align='center'>{cell.name}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data.map((row: any) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.Firstname}</TableCell>

                <TableCell align="center">{row.Lastname}</TableCell>
                <TableCell align="center">{row.Email}</TableCell>
                <TableCell align="center">{row.Phone}</TableCell>
                <TableCell align="center">{row.Status ? "Active" : "InActive"}</TableCell>

                <TableCell align="center"><IconButton aria-label="delete" size="small" onClick={() => setid(row._id)}>
                  <Delete />
                </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={() => handleUpdate(row)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4}>
        <Pagination count={data?.length || 0} onChange={(_e, n) => changeStep(n)} color="primary" />
      </Box>
    </>
  );
}
export default TableComponent;