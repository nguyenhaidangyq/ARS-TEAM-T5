import React, { Component } from "react";
import { LinearProgress, Typography } from "@mui/material";
import "./FlightAmination.scss";
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';


export class FlightAmination extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <div id="flight-amination">
                    <div className="notice-none-flight">
                        <ConnectingAirportsIcon className="plane-icon" />
                        <div className="progress-search">
                            <LinearProgress />
                        </div>
                        <Typography variant="h6">
                            There are currently no incoming flights matching
                            your request.
                        </Typography>
                        <Typography variant="h6">
                            Please change the time to find the right flight
                        </Typography>
                    </div>
                </div>
            </>
        )
    }
}