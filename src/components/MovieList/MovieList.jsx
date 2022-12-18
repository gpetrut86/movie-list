import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";
import noData from "../../assets/noData2.svg";


const MovieList = (props) => {
   
    let favorites = props.favorites;

    return (
 
<>

        {props.movies && props.movies.length > 0 ?
      
        
        <div className="movie-list">
          {props.movies && props.movies.map((movie) => {
            return <MovieCard 
            key={movie.id}
            movie={movie} 
            
            onClick={
                () => {
                    if(favorites){
                        console.log(favorites)
                        if(favorites.find(fav => fav.id === movie.id)){
                            props.removeFromFavorites(movie)
                           
                        }
                        else{
                            props.addToFavorites(movie)
                            
                        }
                    }else{
                        props.addToFavorites(movie)
                        
                    }
                }
            }

            favorites={favorites}
            
            />;
        
        })} 
        
        </div>
         :

         <div className="noData">
           
         <h1 className="noData-title">There are no movies here</h1>
         <nav className="noData-back">Go back to  <span onClick={props.back}>Home</span></nav>
         <img className="noData-image" src={noData} alt="" />
         
         
         </div>
        
    }
    </>
    );
    }

export default MovieList;