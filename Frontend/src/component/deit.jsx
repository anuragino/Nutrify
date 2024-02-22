import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/authContext";
import Header from "./header"

export default function Diet(){

    // Context Data (Globaly exist)
    let loggedData = useContext(authContext)

    // items i.e. foodItem that will display
    const [items,setItems] = useState([])

    // current Date diet Track
    const [date,setDate] = useState(new Date());

    // Initialy when you hadn't eatten
    let [total,setTotal] = useState({
        totalCaloreis:0,
        totalProtein:0,
        totalCarbs:0,
        totalFats:0,
        totalFiber:0
    })

    // it'll called when the date changes (fetch will called and setItems will happen)
    useEffect(()=>{
        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`
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
    },[date])


    // Calculate Total when the items rendered i.e. every time item render total will set to 0.
    // so, the calculation will be done once (if not do so then total will double everytime on click)
    useEffect(()=>{
        calculateTotal();
    },[items])

    // function to calculate the Total macro's that you had eaten 
    // Firstly set total to 0(reset) for accurate Calculation
    function calculateTotal(){
        
        let totalCopy = {
            totalCaloreis:0,
            totalProtein:0,
            totalCarbs:0,
            totalFats:0,
            totalFiber:0
        };

        items.forEach((item)=>{
            totalCopy.totalCaloreis += item.details.calories;
            totalCopy.totalProtein += item.details.protein;
            totalCopy.totalCarbs += item.details.carbohydrates;
            totalCopy.totalFats += item.details.fat;
            totalCopy.totalFiber += item.details.fiber;
        })

        // setting Total to totalCopy data
        setTotal(totalCopy);
    }

    return(
        <section className="container diet-container">
            <Header/>
            
            <input type="date" onChange={(event)=>{
                setDate(new Date(event.target.value));
            }} />

            {/* Display the total Calories you have eatten today or an Particular Date */}
            <div className="item">
                <h1>Total</h1>
                <h3>  {total.totalCaloreis} Kcal </h3>
                <p>Protein {total.totalProtein}g, Carbs {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g</p>

            </div>

            {/* Map or Loop to Display all food item that you have eatten on a particular date */}
            
            <h1>Food Items</h1>
            {
                items.length!==0?
                items.map((item)=>{
                    return(
                        <div className="item" key={item._id}>
                            <h3>{item.foodId.name} ( {item.details.calories} Kcal for {item.quantity}g )</h3>

                            <p>Protein {item.details.protein}g, Carbs {item.details.carbohydrates}g, Fats {item.details.fat}g, Fiber {item.details.fiber}g</p>
                        </div>
                    )
                }):null
            }
            
        </section>
    )
}