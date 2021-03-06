import React, { Component, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Home } from "./Home/Home";
import "./Shared/Styles/Public.scss";
import Reservation from "./Reservation/Reservation";
import BonusServices from "./BonusService/BonusService";
import Payments from "./Payment/Payments";
import FlightTicket from "./ChooseFlightTicket/FlightTicket";
import { Profile } from "./Profile/Profile";
import { SignUp } from "./Account/Components/SignUp/SignUp";
import { SignIn } from "./Account/Components/SignIn/SignIn";

export const Public = () => {

        return (
            <>
                <BrowserRouter>
                    <div id="public">
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/flight-ticket" exact>
                                <FlightTicket />
                            </Route>
                            <Route path="/signup" exact>
                                <SignUp />
                            </Route>
                            <Route path="/signin" exact >
                                <SignIn />
                            </Route>
                            <Route path="/reservation" exact>
                                <Reservation />
                            </Route>
                            <Route path="/bonus-service" exact>
                                <BonusServices />
                            </Route>
                            <Route path="/payment" exact>
                                <Payments />
                            </Route>
                            <Route path="/profile" exact >
                                <Profile />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </>
        )
    }
