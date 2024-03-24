import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/authContext";
import Header from "./header"
import "./css/diet.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import TypingText from "./Animation/typingText";
 

export default function Diet(){

    // Context Data (Globally exist)
    let loggedData = useContext(authContext)

    // items i.e. foodItem that will display
    const [items, setItems] = useState([])

    // current Date diet Track
    const [date, setDate] = useState(formatDate(new Date())); // Initialize with formatted today's date

    // Initialy when you hadn't eaten
    let [total, setTotal] = useState({
        totalCaloreis: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalFiber: 0
    })

    // Format date to YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`; // prepend 0 if month is less than 10 (to match format)
        }
        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`; // prepend 0 if day is less than 10 (to match format)
        }
        return `${year}-${month}-${day}`;
    }

    // it'll be called when the date changes (fetch will be called and setItems will happen)
    useEffect(()=>{
        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/${date}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            // Adding the foodItem that will display
            setItems(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [date])

    // Calculate Total when the items rendered i.e. every time item renders total will set to 0.
    // so, the calculation will be done once (if not do so then total will double every time on click)
    useEffect(()=>{
        calculateTotal();
    }, [items])

    // function to calculate the Total macros that you had eaten 
    // Firstly set total to 0(reset) for accurate Calculation
    function calculateTotal() {
        let totalCopy = {
            totalCaloreis: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0,
            totalFiber: 0
        };
    
        items.forEach((item) => {
            if (item.details) {
                totalCopy.totalCaloreis += item.details.calories || 0;
                totalCopy.totalProtein += item.details.protein || 0;
                totalCopy.totalCarbs += item.details.carbohydrates || 0;
                totalCopy.totalFats += item.details.fat || 0;
                totalCopy.totalFiber += item.details.fiber || 0;
            }
        });
    
        // setting Total to totalCopy data
        setTotal(totalCopy);
        
        loggedData.setLoggedUser((prevState) => {
            return { ...prevState, Total: totalCopy};
        });

        console.log(loggedData);
    }
    

    function logout(){
        localStorage.removeItem("nutrify-user");
        loggedData.setLoggedUser(null);
        navigate("/login");
    } 
    
    return(
        <section className="container diet-container ">
            <Header/>
            <div className="logdate">
                <div className="date-input-container">
                    <input
                        type="date"
                        className="styled-date-input"
                        value={date} // set value to date state
                        onChange={(event) => {
                            setDate(event.target.value);
                        }}
                    />
                    <label htmlFor="datePicker">
                        <FontAwesomeIcon className="calendar-icon" icon={faCalendar} />
                    </label>

                </div>
                
                <div className="logout" onClick={logout}>
                    <FontAwesomeIcon className="log-icon" icon={faRightFromBracket} />
                </div>
            </div>

            {/* Display the total Calories you have eaten today or on a particular Date */}
            <div className="item">
                <h1>Total</h1>
                <h3>  {total.totalCaloreis} Kcal </h3>
                <p>Protein {total.totalProtein}g, Carbs {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g</p>
            </div>

            {/* Map or Loop to Display all food items that you have eaten on a particular date */}
            <h1>Food Items</h1>
            {
                items.length !== 0 ?
                items.map((item) => {
                    // Check if item and item.details exist before accessing properties
                    if (item && item.details) {
                        return (
                            <div className="item" key={item._id}>
                                <h3>{item.foodId.name} ( {item.details.calories} Kcal for {item.quantity}g )</h3>
                                <p>Protein {item.details.protein}g, Carbs {item.details.carbohydrates}g, Fats {item.details.fat}g, Fiber {item.details.fiber}g</p>
                            </div>
                        );
                    } else {
                        // Handle case where item or item.details is missing
                        return null;
                    }
                }) 
                :
                (
                    <div className="text">
                        <TypingText text="Add food items..."/>
                    </div>
                )
            }
        </section>
    )
}
