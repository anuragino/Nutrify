import { useContext } from "react";
import { authContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

export default function Private(props){

    const loggedData = useContext(authContext);

    return(

        loggedData.loggedUser!==null?
        <props.Compontent/>
        :
        <Navigate to="/login" />
    )
}