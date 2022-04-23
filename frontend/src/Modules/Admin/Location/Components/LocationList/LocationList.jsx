import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import { Link, useLocation, useParams, withRouter } from 'react-router-dom';
import locationsService from '../../Shared/Services/LocationService';
import IconButton from '@mui/material/IconButton';
import DeleteLocation from '../DeleteLocation/DeleteLocation';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'province', label: 'Province', minWidth: 50 },

  {
    id: 'airportName',
    label: 'AirportName',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'country',
    label: 'Country',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(id, city, province, airportName, country, edit) {
  return { id, city, province, airportName, country, edit };
}

const rows = [
  createData('1', 'India', 'IN', 'alo', 3287263, 'VnAirline'),
  createData('1', 'China', 'CN', '1403500365', 9596961, 'VnAirline'),
  createData('1', 'Italy', 'IT', '60483973', 301340, 'VnAirline'),
  createData('1', 'United States', 'US', '327167434', 9833520, 'VnAirline'),
  createData('1', 'Canada', 'CA', '37602103', 9984670, 'VnAirline'),
  createData('1', 'Australia', 'AU', '25475400', 7692024, 'VnAirline'),
  createData('1', 'Germany', 'DE', '83019200', 357578, 'VnAirline'),
  createData('1', 'Ireland', 'IE', '4857000', 70273, 'VnAirline'),
  createData('1', 'Mexico', 'MX', '126577691', 1972550, 'VnAirline'),
  createData('1', 'Japan', 'JP', '126317000', 377973, 'VnAirline'),
  createData('1', 'France', 'FR', '67022000', 640679, 'VnAirline'),
  createData('1', 'United Kingdom', 'GB', '67545757', 242495, 'VnAirline'),
  createData('1', 'Russia', 'RU', '146793744', 17098246, 'VnAirline'),
  createData('1', 'Nigeria', 'NG', '200962417', 923768, 'VnAirline'),
  createData('1', 'Brazil', 'BR', '210147125', 8515767, 'VnAirline'),
];

export default function LocationList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [locationList, setLocationList] = useState([]); 
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getLocationList();
    getMsg();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let location = useLocation();
  const getMsg = () => {
    if (typeof location.state !== 'undefined') {
      let isHasMessage = false;
      Object.keys(location.state).forEach(key => {
        if (key === 'message') isHasMessage = true;
      });
      if (isHasMessage) {
        setMsg(location.state.message);
      }
    }
  }

  const getLocationList = async () => {
    await locationsService.getLocationList()
      .then((res) => {
        setLocationList(res.data);
      })
  }
  const onDeleteLocation = async (location) => {
    await locationsService.deleteLocation(location.Id)
    .then((res) => {
        console.log('success', res.data);
        //Handle when success
        getLocationList();
        setMsg({
          type: 'success',
          content: `Delete  location ${location.City.Province.Name} successful !`
        });
       
    })
    .catch((err) => {
        console.log(err);
        //Handle when catching error
        setMsg({
          type: 'error',
          content: `Delete location ${location.City.Province.Name} failed !`
        });
    })
  }

  return (
      <>
      <div id='location'>
        <Paper sx={{ width: '100%' }}>
          <Typography variant="h4" component="div" gutterBottom>
            Location
          </Typography>
          <TableContainer sx={{ maxHeight: 400 }}>
          {
              msg !== '' ? <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={msg.type}>{msg.content}</Alert>
              </Stack> : ''
            }
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                  </TableCell>
                  <TableCell align="right" colSpan={3}>
                    <Link to={"/admin/locations/create"}>
                      <Button variant="contained" startIcon={< AddCircleIcon />}>
                        Add New
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth, textAlign: 'left' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {locationList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((location) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={location.code}>
                        <TableCell>
                          {location.Id}
                        </TableCell>
                        <TableCell>
                          {location.City.Name}
                        </TableCell>
                        <TableCell>
                          {location.City.Province.Name}
                        </TableCell>
                        <TableCell>
                          {location.AirPortName}
                        </TableCell>
                        <TableCell>
                          {location.City.Province.Country}
                        </TableCell>
                        <TableCell>
                          
                          <Link to={"/admin/locations/"+location.Id}>
                          <IconButton aria-label="edit-icon">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <DeleteLocation  location={location} onDeleteLocation={onDeleteLocation}/>
                        </TableCell>


                      </TableRow>

                    );
                  })}
              </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>

  );
}