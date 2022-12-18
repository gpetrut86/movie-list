import "./MovieCard.css";
import { FaHeart } from 'react-icons/fa';
import noData from "../../assets/noData.svg";


const MovieCard = (props) => {

    let isFavorite = false;
    if(props.favorites){
        isFavorite = props.favorites.find(fav => fav.id === props.movie.id);
    }

    return (
        <div className="movie-card">
          
          {props.movie.poster_path === null ? <img src={noData} alt={props.movie.title}/> : 

            <img
                src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
                alt={props.movie.title}
            />
            }   
            <div className="movie-card-body">
                <h3 className="movie-card-title">{props.movie.title}</h3>
                <p className="movie-card-date">{props.movie.release_date}</p>
                <FaHeart className={isFavorite ? "movie-card-button-favorite is-favorite" : "movie-card-button-favorite"} onClick={props.onClick}/>
        </div>
        </div>
    );
    }


export default MovieCard;