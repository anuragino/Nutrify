import { useContext } from "react"
import { authContext } from "../contexts/authContext"
import { Link, NavLink, useNavigate } from "react-router-dom";
import{ FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,faHouse,faBookOpen,faPlus} from "@fortawesome/free-solid-svg-icons";
import "./css/header.css"


export default function Header(props){
    const loggedData = useContext(authContext);
    const navigate = useNavigate();

    const resetFood = props.reset;
    function reset(){
        reset();
    }

    return (
        <div className="nav">
            <img className="logo-pic" src="/Nutrify.png" alt="logo-pic" />
            
            <ul className="nav-ul" >
                    <li className="nav-link">
                        <NavLink to="/home" onClick={reset} className={"nav-color"}>
                            <FontAwesomeIcon className="nav-icon" icon={faHouse} />
                            <span className="nav-text">Home</span>
                        </NavLink>


                    </li>

                    <li className="nav-link">
                        <NavLink to="/track" onClick={reset} className={"nav-color"}>
                            <FontAwesomeIcon className="nav-icon" icon={faPlus} />   
                            <span className="nav-text">Add</span>
                        </NavLink>

                    </li>

                    <li className="nav-link">
                        <NavLink to="/read" className={"nav-color"} >
                            <FontAwesomeIcon className="nav-icon" icon={faBookOpen} />
                            <span className="nav-text">Blogs</span>

                        </NavLink>

                    </li> 

                    <li className="nav-link">
                        <NavLink to="/diet" className={"nav-color"} >
                            <FontAwesomeIcon className="nav-icon" icon={faUser} />
                            <span className="nav-text">User</span>

                        </NavLink>

                    </li> 
                    
            </ul>
        </div>

    )
}