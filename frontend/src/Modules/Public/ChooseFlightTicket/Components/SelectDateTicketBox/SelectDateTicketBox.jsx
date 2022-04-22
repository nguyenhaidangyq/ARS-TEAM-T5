import React, { Component } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Typography } from "@mui/material";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import "./SelectDateTicketBox.scss";
import {
    dateConvert,
    getDayOfWeek,
} from "../../../../../Helpers/datetime";
import {formatCurrencyToVND} from "../../../../../Helpers/currency";

export class SelectDateTicketBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDate: [],
            flightList: [],
            flightListOrg: [],
            departureDate: "",
        }
    }

    componentDidMount = () => {
        // const departureDate = this.props.departureDateTime;
        // const ticketList = this.props.flightTicketList;
        // this.getDaysOfWeek(departureDate, ticketList);
    }

    componentWillReceiveProps = (nextProps) => {
        const departureDate = nextProps.departureDateTime;
        const ticketList = nextProps.flightTicketList;
        this.getDaysOfWeek(departureDate, ticketList);
    }

    compareDate = (departureDate, date) => {
        let depaDate = new Date(departureDate);
        let newDate = new Date(date);
        // if (
        //     depaDate.getDate() == newDate.getDate() &&
        //     newDate.getMonth() == depaDate.getMonth() &&
        //     depaDate.getFullYear() == newDate.getFullYear()
        // )
        //     return true;
        // return false;

        return depaDate.getDate() == newDate.getDate() &&  newDate.getMonth() == depaDate.getMonth() && depaDate.getFullYear() == newDate.getFullYear();
    };

    handleChangeDepartureDate = (data) => {
        // this.props.onChangeDepartureDate(
        //     data,
        //     this.state.flightList,
        //     this.state.flightListOrg
        // );
        // const ticketList = [];
        // this.getDaysOfWeek(data.date, ticketList);
       
    };

    getDaysOfWeek = (departureDate, ticketList) => {
        //TODO:  departureDate = 2022-04-22 
        let current = new Date(departureDate);
        //TODO: current = Fri Apr 22 2022 09:44:00 GMT+0700 (Giờ Đông Dương);
        let flightOnWeek = new Array(); // = []
        current.setDate(current.getDate() - 3);
        //TODO: current = Tue Apr 19 2022 09:44:00 GMT+0700 (Giờ Đông Dương);
        for (let i = 0; i < 7; i++) {
            //TODO: i = 0; i < 7 => 0, 1, 2, 3, 4, 5, 6
            let data = {
                id: i,
                date: new Date(current),
                ticketPrice: this.getPriceFlightTicket(
                    ticketList,
                    new Date(current)
                ),
            };
            flightOnWeek.push(data);
            current.setDate(current.getDate() + 1);
        }
        console.log("🚀 ~ file: SelectDateTicketBox.jsx ~ line 78 ~ SelectDateTicketBox ~ flightOnWeek", flightOnWeek)
        this.setState({
            listDate: flightOnWeek,
        });
    };

    getPriceFlightTicket(ticketList, date) {
        for (let i = 0; i < ticketList.length; i++) {
            if (
                this.compareDate(ticketList[i].Flight.DepartureTime, date)
            ) {
                let ticketPrice = ticketList[i].Price;
                return ticketPrice;
            }
        }
        return "-";
    }

    render() {
        const { listDate, departureDate, flightList } = this.state;
        const { departure, destination, departureDateTime, flightTicketList } = this.props;
        return (
            <>
                <div id="select-ticket-box">
                    <div className="top-content-bar">
                        <AirplanemodeActiveIcon className="icon-plane" />
                        <div className="content">
                            <div className="top-content">
                                <Typography className="location-title">
                                    {`${departure.City.Name}, ${departure.City.Province.Country} (${departure.AirPortCode})`}
                                </Typography>
                                <ArrowRightAltIcon className="icon-arrow" />
                                <Typography className="location-title">
                                {`${destination.City.Name}, ${destination.City.Province.Country} (${destination.AirPortCode})`}
                                </Typography>
                            </div>
                            <Typography className="departure-time">
                                { getDayOfWeek(departureDateTime) } , {dateConvert(departureDateTime)}
                            </Typography>
                        </div>
                    </div>
                    <div className="bottom-content-bar">
                        <div className="row">
                            {listDate.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            this.handleChangeDepartureDate(item)
                                        }
                                        className={
                                            this.compareDate(
                                                departureDate,
                                                item.date
                                            )
                                                ? "item-box item-selected"
                                                : "item-box"
                                        }
                                    >
                                        <span className="item-date">
                                        {dateConvert(item.date)}
                                        </span>
                                        <span className="item-day">
                                        {getDayOfWeek(item.date)}
                                        </span>
                                        <span className="item-price">
                                        {item.ticketPrice !== "-"
                                                ? formatCurrencyToVND(
                                                      item.ticketPrice
                                                  )
                                                : "-"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}