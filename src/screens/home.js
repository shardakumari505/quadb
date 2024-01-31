import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowList from '../components/showList';
import './home.scss';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
            setShows(response.data.map(item => item.show));
            console.log(response);
        };

        fetchData();
    }, []);

    const handleShowClick = (showId) => {
        navigate(`/details/${showId}`);
    };

    return (
        <div className='home-page-container'>
            <h1 className='home-page-h1'>SHOWS</h1>
            <ShowList shows={shows} onShowClick={handleShowClick} />
        </div>
    );
};

export default HomeScreen;
