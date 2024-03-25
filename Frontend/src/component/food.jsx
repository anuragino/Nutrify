import { useContext, useEffect, useState } from "react"
import { authContext } from "../contexts/authContext";
import "./css/food.css"

export default function Food(props){
    
    const [eatenQuantity,setEatenQuantity] = useState(100)   //eatenQuantity that will add in your diet
    const [food,setFood] = useState({})                      //food details store and update 
    const [foodInitial,setFoodInital] = useState({});       //for remebering initial quantity of the food i.e. help in calucation

    // Context Data (Globaly exist)
    const loggedData = useContext(authContext); 

    // It will called only when the foodItem render (onclick)
    useEffect(()=>{
        setFood(props.food);
        setFoodInital(props.food);

        console.log(loggedData)
    },[props.food])

    // Function for calculating the macros that you'll eat
    function calculateMacros(event){
        if(event.target.value.length!==0){
            let quantity = Number(event.target.value);
            // setting it to display 
            setEatenQuantity(quantity);

            let copyFood = {...food};
            copyFood.protein = (foodInitial.protein*quantity)/100;
            copyFood.carbohydrates = (foodInitial.carbohydrates*quantity)/100;
            copyFood.fat = (foodInitial.fat*quantity)/100;
            copyFood.fiber = (foodInitial.fiber*quantity)/100;
            copyFood.calories = (foodInitial.calories*quantity)/100;
            // setting it to display 
            setFood(copyFood);
        }
    }


    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })

    // function to post or add foodItem in your diet
    function trackFoodItem(){
        // Details obj
        let trackItem = {
            userId: loggedData.loggedUser.userid,
            foodId: food._id,
            details:{
                protein:food.protein,
                carbohydrates:food.carbohydrates,
                fat:food.fat,
                fiber:food.fiber,
                calories:food.calories
            },
            quantity:eatenQuantity
        }

        console.log(trackItem);

        // adding eaten Food item in the api DB
        fetch("http://localhost:8000/track",{
            method:"POST",
            body: JSON.stringify(trackItem),
            headers:{
                "Authorization" :`Bearear ${loggedData.loggedUser.token}`,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)

            setMessage({type:"success",text:`${data.message} ${eatenQuantity}gm`});
            setTimeout(()=>{
                setMessage({type:"invisible-msg",text:"Dummy sg"});
            },5000)
        })
        .catch((err)=>{
            console.log(err);
        })

    }


    return(
        <div className="food">
            <div className="food-img">
                <img className="food-image" src={food.image}/>
            </div>

            <section className="food-info">
                <h3>{food.name} ({food.calories} Kcal for {eatenQuantity}G)</h3>

                <section className="nutrient-info">
                    <article className="nutrient">
                        <img className="nut-img" src="/symbol/Protein.png" alt="protein" />
                        <p className="n-value">{food.protein}g</p>
                    </article>

                    <article className="nutrient">
                        <img className="nut-img" src="/symbol/carb.png" alt="carb" />
                        <p className="n-value">{food.carbohydrates}g</p>
                    </article>

                    <article className="nutrient">
                        <img className="nut-img" src="/symbol/fat.png" alt="fat" />
                        <p className="n-value">{food.fat}g</p>
                    </article>

                    <article className="nutrient">
                        <img className="nut-img" src="/symbol/Fiber.png" alt="fiber" />
                        <p className="n-value">{food.fiber}g</p>
                    </article>
                </section>

                <div className="track-sec">
                    <p className={message.type}>{message.text}</p>
                    <div className="track-control">
                        <input type="number" maxLength={6} onChange={calculateMacros} className="inp" placeholder="Quantity in Gms" />

                        <button className="btn" onClick={trackFoodItem} >Track</button>
                    </div>
                </div>

            </section>

            

        </div>
    )
}