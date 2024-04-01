import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/authContext";
import{ FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket,faChevronRight,faFileLines,faGear,faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import "./css/profile.css";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const loggedData = useContext(authContext);

    const { name } = loggedData.loggedUser;

    function logout(){
        localStorage.removeItem("nutrify-user");
        loggedData.setLoggedUser(null);
        navigate("/login");
    } 

    const navigate = useNavigate();

    return (
        <div className='profile-container container'>
            <p className="pro-n">Profile</p>

            <div className="user-info">

                <img className="pro-img" src="/user.png" alt="" />
                <h1>{name}</h1>
            </div>
            


            <div className='pro-att' onClick={()=>{
                        navigate("/home");
            }}>
                <FontAwesomeIcon className="att-icon" icon={faUser} />   
                <p>Edit Profile</p>
                <FontAwesomeIcon className="arrow" icon={faChevronRight} />
            </div>

            {/* <div className='pro-att'>
                <FontAwesomeIcon className="att-icon" icon={faGear} />
                <p>Settings</p>
                <FontAwesomeIcon className="arrow" icon={faChevronRight} />
            </div> */}

            <div className='pro-att'  onClick={()=>{
                            window.open("https://github.com/anuragino/Nutrify", "_blank");
            }}>
                <FontAwesomeIcon className="att-icon" icon={faFileLines} />
                <p>Terms & Privacy Policy</p>
                <FontAwesomeIcon className="arrow" icon={faChevronRight} />
            </div>

            <div className='pro-att' onClick={logout}>
                <FontAwesomeIcon className="att-icon" icon={faRightFromBracket} />
                <p>Logout</p>
                <FontAwesomeIcon className="arrow" icon={faChevronRight} />
            </div>

            <Header />


        </div>
    )
}
