import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./BookingHistory.scss";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import publicService from "../../../Shared/Services/PublicService";
import { dateConvert } from "../../../../../Helpers/datetime";
import { formatCurrencyToVND } from "../../../../../Helpers/currency";


export class BookingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openAlert: false,
            bookingList: [],
            message: "",
            errMessage: "",
        }
    }

    componentDidMount = () => {
        this.getUserBookingList();
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    handleCancel = () => {
        this.setState({
            openAlert: true
        });
        this.handleClose();
    }

    handleCloseMessage = () => {
        this.setState({
            openAlert: false
        });
    }

    getUserBookingList = async () => {
        await publicService.getUserBookingList()
            .then((res) => {
                console.log("🚀 ~ file: BookingHistory.jsx ~ line 55 ~ BookingHistory ~ .then ~ res", res.data)
                this.setState({
                    bookingList: res.data,
                });
            });
    }

    deleteUserBooking = async (id) => {
        await publicService.deleteUserBooking(id)
            .then((res) => {
                this.setState({
                    message: `Cancel booking ${res.data.Flight.departure.city} - ${res.data.Flight.destination.city} successfull`,
                })
                this.getUserBookingList();
            })
            .catch((err) => {
                this.setState({
                    errMessage: `Cancel booking failed, try again please`,
                });
            });
    }




    render() {
        const { open, openAlert, bookingList } = this.state;
        let loop = 1;
        
        return (
            <>
                <div className="user-booking-list">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Booking List</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Booking date</th>
                                                <th>Route</th>
                                                <th>Flight</th>
                                                <th>Total</th>
                                                <th>Payment status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookingList.map((item) => {
                                                return (
                                                    <tr key={item.Id}>
                                                        <td className="text-bold-500">
                                                            {loop++}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {dateConvert(
                                                                item.BookingTickets[0].Ticket.Flight.ArrivalTime
                                                            )}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {`${item.BookingTickets[0].Ticket.Flight.Departure.City.Name} - ${item.BookingTickets[0].Ticket.Flight.Destination.City.Name}`}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {item.BookingTickets[0].Ticket.Flight.FlightCode}
                                                        </td>
                                                        <td className="text-bold-500">
                                                            {formatCurrencyToVND(
                                                                item.BookingTickets[0].Ticket.Price
                                                            )}
                                                        </td>
                                                        <td>
                                                            {item.BookingTickets.PaymentMethod === 0
                                                                ? "Unpaid"
                                                                : "Paid"
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="btn-box-control">
                                                                <Link to={`/profile/bookings/${item.BookingCode}`} >
                                                                    <Button fullWidth variant="contained">View Details</Button>
                                                                </Link>
                                                                <Button variant="outlined" className="cancel" color="error" onClick={this.handleClickOpen}>
                                                                    Cancel
                                                                </Button>
                                                                <Dialog
                                                                    open={open}
                                                                    onClose={this.handleClose}
                                                                    aria-labelledby="alert-dialog-title"
                                                                    aria-describedby="alert-dialog-description"
                                                                >
                                                                    <DialogTitle id="alert-dialog-title">
                                                                        Warning
                                                                    </DialogTitle>
                                                                    <DialogContent>
                                                                        <DialogContentText id="alert-dialog-description">
                                                                            Are you sure delete booking
                                                                        </DialogContentText>
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button onClick={this.handleClose}>Disagree</Button>
                                                                        <Button onClick={this.deleteUserBooking} autoFocus>
                                                                            Agree
                                                                        </Button>
                                                                    </DialogActions>
                                                                </Dialog>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={openAlert} onClose={this.handleCloseMessage} autoHideDuration={3000}>
                        <Alert onClose={this.handleCloseMessage} severity="success" sx={{ width: '100%' }}>
                            This is a success message!
                        </Alert>
                    </Snackbar>
                </Stack>
            </>
        )
    }
}