import React from 'react';
import { ReactRouter as Router, Link } from "react-router-dom";
import './VenueSelection.css'
import progress from './progress-bar.svg';
import DATA from './venueDATA';

const VenueSelection = () => {
      
    return (
        <div className="Venues-page">
            <div className="Header">
                <div className="Title">
                VENUE BOOKING SYSTEM
                </div>
                <img src={progress} className='header-image' />
            </div>
            <div className='venues-container'> 
                {DATA.map((venue) => (
                    <div className="venue">
                    <Link
                    to={{ pathname: `./vbs/${venue.venueName}`, state: venue }}
                    className="specificVenue"
                    >
                    <img
                        src={venue.venueImage}
                        alt="Venue Image Here"
                        className="venueImage"
                    />
                    <div className="venueName">{venue.venueName}</div>
                    </Link>
                    </div> 
                ))}
            </div>
        </div>
    )
}

export default VenueSelection;