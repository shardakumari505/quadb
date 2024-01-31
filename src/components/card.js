import React,{ useState } from "react";
import './card.scss';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="aboutussummary">
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };

const Card = ({imgUrl,Desc,IMDB, onCardClick}) => {
    return(
        <div className="main-card-containerrr" style={{backgroundImage:`url(${imgUrl})`}}>
            <div className="main-card-container-before-hoverrr">
                <div className="main-card-container-toppp">
                    
                </div>

                <div className="main-card-container-bottommm">
                    <span className="fa fa-star fa-2x checked"></span>
                    <div className="main-card-container-top-texttt">{IMDB}</div>
                    <img className="imdbicon" src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" alt="The Dark Knight (2008) on IMDb" />
                </div>
            </div>

            <div className="main-card-container-bottom-on-hoverrr">
                <div className="main-card-container-bottom-on-hover-texttt"><ReadMore>{Desc}</ReadMore></div>
                {/* <div className="main-card-bottom-buttonnn">View Trailer</div> */}
                <button className="main-card-bottom-buttonnn" onClick={onCardClick}>Details</button>
            </div>
        </div>
    );
}

export default Card;