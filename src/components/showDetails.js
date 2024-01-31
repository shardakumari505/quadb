import React from 'react';

const ShowDetails = ({ show, onBookTicket }) => {
    return (
        <div>
            <h2 style={{marginTop:0}}>{show.name}</h2>
            <p>{show.summary}</p>
            {/* <button onClick={() => onBookTicket(show)}>Book Ticket</button> */}
        </div>
    );
};

export default ShowDetails;
