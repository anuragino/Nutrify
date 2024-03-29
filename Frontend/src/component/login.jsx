import { useState,useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { authContext } from "../contexts/authContext";


export default function Login(){
    // see password btn
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // authContext
    const loggedData = useContext(authContext);

    // user credentials
    const [userCred,setUserCred] = useState({
        email:"",
        password:""
    })

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })

    function handleInput(event){ 
        setUserCred((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value};

        }) 
    }

    const navigate = useNavigate();

    function handleSubmit(event){  
        event.preventDefault(); 
        console.log(userCred);

        fetch("https://nutrify-api.vercel.app/login",{
            method:"POST",
            body:JSON.stringify(userCred),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{

            if(response.status===404)
            {
                setMessage({type:"error",text:"Username or Email Doesnt Exist"});
            }
            else if(response.status===403) {
                setMessage({type:"error",text:"Incorrect Password"});
            }

            setTimeout(()=>{
                setMessage({type:"invisible-msg",text:"Dummy Msg"})
            },5000)

            return response.json();  
        })
        .then((data)=>{
            console.log(data);
            if(data.token!==undefined){
                localStorage.setItem("nutrify-user",JSON.stringify(data));
                loggedData.setLoggedUser(data);
                navigate("/home")
            }

        })
        .catch((err)=>{
            console.log(err);
        })


    }

    return(
        <section className="container full">
            <h1>Login to Fitness</h1>
            <img src="/login.png" alt="login" className="log-img" />
            <form className="form" onSubmit={handleSubmit}>

                <input type="email" required name="email" className="inp" onChange={handleInput} placeholder="Enter Email" value={userCred.email}/>
                
                <div className="password-input">
                    <input
                        name="password"
                        className="inp"
                        type={passwordVisible ? 'text' : 'password'}
                        onChange={handleInput}
                        maxLength={8}
                        placeholder="Enter password"
                        value={userCred.password}
                        required
                    />
                    <div className="toggle-icon" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </div>
                </div>

                <button className="btn log-b">Login</button>

                <p>Not Registered? <Link className="link" to="/register"> Create a new Account</Link> </p>

                <p className={message.type}>{message.text}</p>

            </form>
        </section>
    )
}