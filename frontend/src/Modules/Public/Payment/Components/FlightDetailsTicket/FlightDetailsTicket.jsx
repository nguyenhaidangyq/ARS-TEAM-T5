import { Typography } from "@mui/material";
import React, { Component } from "react";
import "./FlightDetailsTicket.scss";
import { getTime, getDate } from "../../../../../Helpers/datetime";
import { BASE_URL_SERVER } from "../../../../../Configs/server";

export class FlightDetailsTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { bookingData } = this.props;
        return (
            <>
                <div className="flight-booking-detail">
                    <div className="title-box">
                        <Typography variant="h6" className="title">
                            Flight details
                        </Typography>
                    </div>
                    <div className="content">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="logo-box">
                                    <img
                                        src={`${BASE_URL_SERVER}/${bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.Airline.Logo}`}
                                        width={200}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="list-info">
                                    <Typography className="info-item">
                                        Departure:  {bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.Departure.City.Name}
                                        ({bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.Departure.AirPortCode})
                                    </Typography>
                                    <Typography className="info-item">
                                        Airport : {bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.Destination.AirPortName}
                                    </Typography>
                                    <Typography className="info-item">
                                        Landing : {getTime(
                                            bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.DepartureTime
                                        )}
                                    </Typography>
                                    <Typography className="info-item">
                                        Date : {getDate(
                                            bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.CreatedAt
                                        )}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="list-info">
                                    <Typography className="info-item">
                                        Destination:  {bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.Destination.City.Province.Name}
                                        ({bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.Destination.AirPortCode})

                                    </Typography>
                                    <Typography className="info-item">
                                        Airport :  {bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.Destination.AirPortName}
                                    </Typography>
                                    <Typography className="info-item">
                                        Landing :  {getTime(
                                            bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight
                                                .ArrivalTime
                                        )}
                                    </Typography>
                                    <Typography className="info-item">
                                        Date :  {getDate(
                                            bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.UpdatedAt
                                        )}
                                    </Typography>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="list-info">
                                    <Typography className="info-item">
                                        Flight :   {bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.FlightCode}
                                    </Typography>
                                    <Typography className="info-item">
                                        Available Class: {bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.AvailableClass}
                                    </Typography>
                                    <Typography className="info-item">
                                        Ticket: {bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.TicketType}
                                    </Typography>
                                    <Typography className="info-item">
                                        Aircraft :  {bookingData.BookingTickets && bookingData.BookingTickets.length > 0 && bookingData.BookingTickets[0].Ticket.Flight.Aircraft}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}