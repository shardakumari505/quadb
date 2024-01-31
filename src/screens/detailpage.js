// screens/ShowDetailsScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ShowDetails from '../components/showDetails';
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
                setShow(response.data);
            } catch (error) {
                console.error('Error fetching show details:', error);
            }
        };

        fetchData();
    }, [showId]);

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
                <>
                    <ShowDetails show={show} onBookTicket={handleBookTicket} />
                    {/* <BookTicketForm show={show} onSubmit={handleBookTicket} /> */}
                    <Button variant="outlined" onClick={handleClickOpen}>
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
                                    <span>{show.summary}</span>
                                    <span>Language : {show.language}</span>
                                    <span>Genres : {show.genres}</span>
                                    <span>Scheduled Day: {show.schedule.days}</span>
                                    <span>Scheduled Time : {show.schedule.time}</span>
                                    <span>Seats </span>
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
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowDetailsScreen;
