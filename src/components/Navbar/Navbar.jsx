import "./navbar.scss";
import {  FaWindowClose } from 'react-icons/fa';
import MovieLogo from '../../assets/MovieLogo.svg';

const Navbar = (props) => {
    


    return (
   
            <div className="navbar">
                <div className="navbar-content">
                        <h1 onClick={props.back} className="navbar-brand"><img src={MovieLogo} alt="" /> Movies</h1>
                        <form className="search-form" autoComplete="off">
                          
                            
                        
                            <input type="text" placeholder="Search" id="searchForm"  className="search-input" autoComplete="off" value={props.search}
                             onChange={(e)=>{  props.setSearch(e.target.value)}} />
                                <FaWindowClose className="delete-search" onClick={props.back} />
                          
                        </form>
                </div>
            </div>
    );
    }

export default Navbar;