import { ThirtyFpsSelect } from "@mui/icons-material";
import React, { Component } from "react";
import Navbar from "../Shared/Components/Navbar/Navbar";
import { Footer } from "../Shared/Footer/Footer";
import { SupportInfo } from "../SupportInfo/SupportInfo";
import FavouriteDestination from "./Components/FavouriteDestination/FavouriteDestination";
import { Header } from "./Components/Header/Header";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favouriteDestination : "",

        }
    }
    onSelectDestinationThumbnail = (destination) => {
        this.setState({
            favouriteDestination : destination,
        });
        window.scrollTo(0, 0)
        
    }
    render() {
        const { favouriteDestination } = this.state;
        return (
            <>
            <Navbar />
            <Header favouriteDestination={favouriteDestination} />
            <FavouriteDestination onSelectDestinationThumbnail={this.onSelectDestinationThumbnail} />
            <SupportInfo />
            <Footer />
            </>
        )
    }
}