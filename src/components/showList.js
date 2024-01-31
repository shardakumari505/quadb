import React from 'react';
import './showList.scss';
import Card from './card';

const ShowList = ({ shows, onShowClick }) => {
    return (
        <div className='showList-container'>
            {shows.map((show) => {
                const data = show.summary;
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const textContent = doc.body.textContent;

                return (
                    <Card
                        key={show.id}
                        MovieName={show.name}
                        Desc={textContent}
                        imgUrl={show.image ? show.image.original : null}
                        IMDB={show.rating.average}
                        onCardClick={() => onShowClick(show.id, textContent)}
                    />
                );
            })}
        </div>
    );
};

export default ShowList;
