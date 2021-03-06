import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./FlightList.scss";
import axios from "axios";
import flightService from "../../Shared/Services/FlightService";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Link, useLocation } from "react-router-dom";
import DeleteFlight from "../DeleteFlight/DeleteFlight";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";  
import airlineService from "../../../Airline/Shared/Services/AirlineService";
import locationsService from "../../../Location/Shared/Services/LocationService";

import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const columns = [
  { id: "id", label: "Id", minWidth: 80 },
  {
    id: "flightCode",
    label: "FlightCode",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "departure",
    label: "Departure",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "destination",
    label: "Destination",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "airline ",
    label: "Airline",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status ",
    label: "Status",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "edit",
    label: "Edit",
    minWidth: 80,
    align: "left",
  },
];

function createData(flightCode, departure, destination, airline, status) {
  return { flightCode, departure, destination, airline, status };
}

const rows = [
  createData("1", "Vietnam Airline", "VN", "Viet Nam", "Bong sen vang"),
  createData("2", "Bamboo Airways", "QH", "Viet Nam", "Cay tre"),
  createData("3", "Vietravel Airlines", "VU", "Viet Nam", "Viettravel"),
];
const FILTER_TYPE = {
  FLIGHT: 1,
 }
export default function FlightList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [flightList, setFlightList] = useState([]);
  const [flightListAPI, setFlightListAPI] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState('');
  const [filterByProvince, setFilterByProvince] = useState(0);
  const [filterAirlineId, setFilterByAirlineId] = useState(0);
  const [airlineList, setAirlineList] = useState([]);
  const [departureList, setDepartureList] = useState([]);
  const [destinationList, setDestinationList] = useState([]);
  const [filterDepartureId, setFilterDepartureId] = useState(0);
  const [filterDestinationId, setFilterDestinationId] = useState(0);




  useEffect(() => {
    getFlightList();
    getAirlineList();
    getLocationList();
    getMsg();
  }, []);
    
  useEffect(() => {
    const flightList = flightListAPI.filter((flight) => {
      return flight.AirlineId == filterAirlineId
    })

   setFlightList(flightList)
  },[filterAirlineId]);
  useEffect(() => {
    const flightList = flightListAPI.filter((flight) => {
      return flight.DepartureId == filterDepartureId
    })

   setFlightList(flightList)
  },[filterDepartureId]);
  useEffect(() => {
    const flightList = flightListAPI.filter((flight) => {
      return flight.DestinationId== filterDestinationId
    })

   setFlightList(flightList)
  },[filterDestinationId]);
  
  useEffect(() =>{
    setFlightList(flightListAPI.filter((flight) => {
      return(flight.FlightCode.toLowerCase()).includes(searchValue.toLowerCase())
    }));
  },[searchValue]);

  const getLocationList = async () => {
    await locationsService.getLocationList()
    .then ((res) => {
      setDepartureList(res.data);
      setDestinationList(res.data);
    })
  }
  
  const getAirlineList = async () => {
    await airlineService.getAirlineList()
      .then((res) => {
        setAirlineList(res.data);
      })
    }

  const getFlightList = async () => {
    await flightService
      .getFlightList()
      .then((res) => {
        setFlightList(res.data);
        setFlightListAPI(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeFilterType = async (ev) => {
    setFilterType(ev.target.value);
    if(ev.target.value == FILTER_TYPE.LOCATION) {
      await flightService.getFlightList()
        .then((res) => {
          setFlightList(res.data);
        })
    }
   }
  
   const handleChangeDeparture = (ev) =>{
     
   setFilterDepartureId(ev.target.value);
  }
  const handleChangeDestination = (ev) =>{
     
    setFilterDestinationId(ev.target.value);
   }
  
   const handleChangeAirline = (ev) =>{
     
    setFilterByAirlineId(ev.target.value)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let location = useLocation();
  const getMsg = () => {
    if (typeof location.state !== "undefined") {
      let isHasMessage = false;
      Object.keys(location.state).forEach((key) => {
        if (key === "message") isHasMessage = true;
      });
      if (isHasMessage) {
        setMsg(location.state.message);
      }
    }
  };
  const onDeleteFlight = async (flight) => {
    await flightService
      .deleteFlight(flight.Id)
      .then((res) => {
        console.log("success", res.data);
        //Handle when success
        getFlightList();
        setMsg({
          type: "success",
          content: `Delete flight  ${flight.FlightCode} successful !`,
        });
      })
      .catch((err) => {
        console.log(err);
        //Handle when catching error
        setMsg({
          type: "error",
          content: `Delete flight  ${flight.FlightCode} failed !`,
        });
      });
  };

  return (
    <>
      <div id="Flight">
        <Paper sx={{ width: "100%" }}>
          <Typography variant="h4" component="div" gutterBottom>
            Flight
          </Typography>
          <TableContainer sx={{ maxHeight: 5000 }}>
            {msg !== "" ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={msg.type}>{msg.content}</Alert>
              </Stack>
            ) : (
              ""
            )}

            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                  <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 260,
                      }}
                    >
                      <IconButton sx={{ p: "10px" }} aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Flight Code"
                        inputProps={{ "aria-label": "search google maps" }}
                        value={searchValue}
                        onChange={(ev) => setSearchValue(ev.target.value)}
                      />
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                    </Paper>
                    <FormControl sx={{ m: 1, width: 200,right:40, top: 10  }}>
                      <InputLabel id="demo-multiple-name-label">
                        Airline
                      </InputLabel>
                      <Select
                        id="airline"
                        value={filterAirlineId}
                        onChange={handleChangeAirline}
                        input={<OutlinedInput label="Select" />}
                      >
                        {airlineList.map((airline) => (
                          <MenuItem
                            key={airline.Id}
                            value={airline.Id}
                          >
                            {airline.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 200, right: 40, top: 10 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Departure
                      </InputLabel>
                      <Select
                        id="departure"
                        value={filterDepartureId}
                        onChange={handleChangeDeparture }
                        input={<OutlinedInput label="Select" />}
                      >
                        {departureList.map((departure) => (
                          <MenuItem
                            key={departure.Id}
                            value={departure.Id}
                          >
                            {departure.City.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 200, right: 10, top:10 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Destination
                      </InputLabel>
                      <Select
                        id="destination"
                        value={filterDestinationId}
                        onChange={handleChangeDestination}
                        input={<OutlinedInput label="Select" />}
                      >
                        {destinationList.map((destination) => (
                          <MenuItem
                            key={destination.Id}
                            value={destination.Id}
                          >
                            {destination.City.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, top: 20, }}>
                      <Button variant="contained" startIcon={<SearchIcon />}>
                        Search
                      </Button>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right" colSpan={12}>
                    <Link to={"/admin/flights/create"}>
                      <Button variant="contained" startIcon={<AddCircleIcon />}>
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
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {flightList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((flight) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={flight.code}
                    >
                      <TableCell>{flight.Id}</TableCell>
                      <TableCell>{flight.FlightCode}</TableCell>
                      <TableCell>{flight.Departure.City.Name}</TableCell>
                      <TableCell>{flight.Destination.City.Name}</TableCell>
                      <TableCell>{flight.Airline.Name}</TableCell>
                      <TableCell>
                        {flight.Status === 1 ? (
                          <Button variant="contained" color="error">
                            Deactive
                          </Button>
                        ) : (
                          <Button variant="contained" color="success">
                            Active
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link to={`/admin/flights/${flight.Id}`}>
                          <IconButton aria-label="edit-icon">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <DeleteFlight
                          flight={flight}
                          onDeleteFlight={onDeleteFlight}
                        />
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
