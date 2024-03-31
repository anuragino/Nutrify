import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Register(){

    const [userDetails,setUserDetails] = useState({
        name:"",
        email:"",
        password:"",
        age:""
    })

    // see password btn
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })

    function handleInput(event){ 
        setUserDetails((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value};

        }) 
    }

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        console.log(userDetails);

        fetch("https://nutrify-api.vercel.app/register",{
            method : "POST",
            body : JSON.stringify(userDetails),
            headers : {
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            setMessage({type:"success",text:data.message});

            setUserDetails({
                name:"",
                email:"",
                password:"",
                age:""
            })

            setTimeout(()=>{
                setMessage({type:"invisible-msg",text:"Dummy sg"});
            },5000)
            navigate("/login")

        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <section className="container full">
            
            <h1 >Join Us For Fitness</h1>
            <img src="/signup.png" alt="signup" className="log-img" />
            <form className="form" onSubmit={handleSubmit}>

                <input type="text" onChange={handleInput} required name="name" className="inp" placeholder="Enter Name" value={userDetails.name}/>

                <input type="email" onChange={handleInput} required name="email" className="inp" placeholder="Enter Email" value={userDetails.email}/>

                <div className="password-input">
                    <input
                        name="password"
                        className="inp"
                        type={passwordVisible ? 'text' : 'password'}
                        value={userDetails.password}
                        onChange={handleInput}
                        maxLength={8}
                        placeholder="Enter password"
                        required
                    />
                    <div className="toggle-icon" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </div>
                </div>

                <input type="number" min={12} max={100} onChange={handleInput} name="age" className="inp" placeholder="Enter Age" value={userDetails.age} />

                <button className="btn log-b">Register</button>

                <p>Already Registered? <Link className="link" to="/login">Login</Link> </p>
                <p className={message.type}>{message.text}</p>
            </form>
            
        </section>
        
    )
}