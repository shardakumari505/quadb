import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Container } from '@mui/material';
import Radio from '@mui/material/Radio';
import { pink } from '@mui/material/colors';
import './detailpage.scss';

const ShowDetailsScreen = () => {
    const { showId } = useParams();
    const [show, setShow] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item.toString(),
        onChange: handleChange,
        value: item.toString(),
        name: `radio-${item}`,
        inputProps: { 'aria-label': item },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
                const cleanedShow = {
                    ...response.data,
                    summary: cleanHTMLTags(response.data.summary),
                };
                setShow(cleanedShow);
            } catch (error) {
                console.error('Error fetching show details:', error);
            }
        };

        fetchData();
    }, [showId]);
    const cleanHTMLTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const [formData, setFormData] = useState(() => ({
        name: "",
        email: "",
    }));

    const initialFormData = {
        name: "",
        email: "",
    };

    const handleButtonChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleBookTicket = (formData, selectedValue) => {
        console.log('Booking details:', { ...formData, seat: selectedValue });
        const cleanedData = Object.fromEntries(
            Object.entries({ ...formData, seat: selectedValue }).filter(([key]) => key !== "")
        );

        const jsonData = JSON.stringify(cleanedData, null, 2);

        const blob = new Blob([jsonData], { type: "application/json" });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "booking-details.json";
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(link);

        setFormData(initialFormData);
        setSelectedValue('');
        handleClose();
    };



    return (
        <div className='detail-page-container'>
            {show ? (
                <div className="movie-movie-container">
                    <div className="image-container" style={{ backgroundImage: `url(${show.image.original})` }} ><div className="image-overlay"></div>
                        <div className="movie-all-texts">
                            <div className="movie-title-and-imdb-rating1">
                                <span className="movie-title-on-main-movie-page1">{show.name}</span>
                                <span className="imdbRatingPlugin1" data-user="ur161205415" data-title="tt0468569" data-style="p1">
                                    <img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" alt="The Dark Knight (2008) on IMDb" />
                                    <h6>{show.rating.average}</h6>
                                    <span className="fa fa-star star-movie-icon"></span>
                                </span>
                            </div>
                            <span className="movie-details-on-main-movie-page">
                                <span className="meta-data">{show.premiered} ‧ {show.network.country.code} ‧ {show.genres} ‧ {show.language} ‧ {show.runtime}</span>
                            </span>
                            <span className="movie-description-on-main-movie-page">{show.summary}</span>
                            <span className="more-about-movie-on-main-movie-page">
                                <span className="more-meta-data-movie-page">
                                    <span className="left-column-movie-page">Type</span>
                                    <span className="right-column-movie-page">{show.type}</span>
                                </span>
                                <span className="more-meta-data-movie-page">
                                    <span className="left-column-movie-page">Status</span>
                                    <span className="right-column-movie-page">{show.status}</span>
                                </span>
                                <span className="more-meta-data-movie-page">
                                    <span className="left-column-movie-page">Premiered</span>
                                    <span className="right-column-movie-page">{show.premiered}</span>
                                </span>
                                <span className="more-meta-data-movie-page">
                                    <span className="left-column-movie-page">Ended</span>
                                    <span className="right-column-movie-page">{show.ended}</span>
                                </span>
                                <span className="more-meta-data-movie-page">
                                    <span className="left-column-movie-page">TimeZone</span>
                                    <span className="right-column-movie-page">{show.network.country.timezone}</span>
                                </span>
                            </span>
                            <div className="movie-play-button-container">
                                <div className="movie-play-left-container">
                                    
                                    <div className="movie-share-button">
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Button className='book-ticket-button' variant="outlined" onClick={handleClickOpen}>
                                                Book Ticket
                                            </Button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <DialogTitle>{show.name}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                                            <span style={{ textAlign: "justify" }}>{show.summary}</span>
                                                            <span><b>Language :</b> {show.language}</span>
                                                            <span><b>Genres :</b> {show.genres}</span>
                                                            <span><b>Scheduled Day:</b> {show.schedule.days}</span>
                                                            <span><b>Scheduled Time :</b> {show.schedule.time}</span>
                                                            <span><b>Seats </b></span>
                                                            <Container sx={{ display: "flex" }}>
                                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                                                                    <div key={number}>
                                                                        <Radio
                                                                            {...controlProps(number)}
                                                                            sx={{
                                                                                color: pink[800],
                                                                                '&.Mui-checked': {
                                                                                    color: pink[600],
                                                                                },
                                                                            }}
                                                                        />
                                                                        <span>{number}</span>
                                                                    </div>
                                                                ))}
                                                            </Container>
                                                        </div>
                                                    </DialogContentText>
                                                    <TextField
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        id="name"
                                                        name="name"
                                                        label="Name"
                                                        type="name"
                                                        fullWidth
                                                        variant="standard"
                                                        value={formData.name}
                                                        onChange={handleButtonChange}
                                                    />
                                                    <TextField
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        id="email"
                                                        name="email"
                                                        label="Email Address"
                                                        type="email"
                                                        fullWidth
                                                        variant="standard"
                                                        value={formData.email}
                                                        onChange={handleButtonChange}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button onClick={() => handleBookTicket(formData, selectedValue)}>Book</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowDetailsScreen;
