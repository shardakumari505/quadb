import React from 'react';
import './showList.scss';

const ShowList = ({ shows, onShowClick }) => {
    return (
        <div className='showList-container'>
            <ul>
                {shows.map((show) => (
                    <li key={show.id}>
                        <h3>{show.name}</h3>
                        <p>{show.summary}</p>
                        <button onClick={() => onShowClick(show.id)}>Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowList;
