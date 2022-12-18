import "./NavLinks.css";
import { FaArrowDown, FaHeart } from 'react-icons/fa';

const NavLinks = ({ category, HandleFavorites, HandelCategory, favorites }) => {

        const toggleCategory = () => {
            const dropdown = document.querySelector(".dropdown-content");

            dropdown.classList.toggle("show");
        }

    

    return(
        <div className="navlinks">
        <div className="dropdown">
            <div className="dropbtn" onClick={toggleCategory} >Category <FaArrowDown /> </div>
            <div className="dropdown-content">
                {category && category.map((cat) => {
                    return <div key={cat.id} onClick={()=>{
                        HandelCategory(cat.id)
                        toggleCategory();
                    }}>{cat.name}</div> 
                        
                })}
            </div>
        </div>

        <div className="navlinks-favorite-btn" onClick={HandleFavorites}>Favorites <FaHeart className={favorites && favorites.length > 0 ? "redHeart" : ""} /> </div>

        </div>
    )
}

export default NavLinks;
