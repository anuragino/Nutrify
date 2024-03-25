import { useContext, useEffect, useState } from "react"
import { authContext } from "../contexts/authContext"
import Food from "./food";
import Header from "./header"
import "./css/track.css"
import { useNavigate } from "react-router-dom";
import TypingText from "./Animation/typingText";


export default function Track(){

    const loggedData = useContext(authContext);
    const [foodItems,setFoodItems] = useState([]);
    const [food,setFood] = useState(null);

    const [visible,setVisible] = useState(false);

    // placeholder animated text visiblity state
    const [placeText,setPlaceText] = useState(true);

    const navigate = useNavigate();


    // onClick of home icon food should be gone 
    const [reset,setReset] = useState(true);   //var for track og
    function resetVisible(){
        setReset(false);
    };

    function searchFood(event){
        // if you type smthg in search box
        if(event.target.value.length!==0){
            // fetch data from db
            fetch(`http://localhost:8000/foods/${event.target.value}`,{
                method:"GET",
                headers:{
                    "Authorization" : `Bearer ${loggedData.loggedUser.token}`
                }
            })

            .then((response)=>response.json())

            .then((data)=>{
                console.log(data);
                // if foodItem do exist i.e. array exist (No message will came)
                if(data.message===undefined){
                    setFoodItems(data);
                }
                // if foodItem is not present and message appear(food not found)
                else{
                    setFoodItems([]);
                }
            })

        }
        // when we clear the search name should gone.
        else{
            setFoodItems([]);
        }
    }

    return (
        
        <section className="container track-container">
                
              <div className="search">
                  <input type="search" className="search-inp"
                    onClick={()=>{
                        setVisible(true);
                        setPlaceText(false);
                    }}
                    onChange={searchFood} 
                    placeholder="Search for food..."
                /> 
                

                {
                      // when you type smthg
                      visible&&foodItems.length!==0?
                      (
                      <div className="search-results">
                          {
                              foodItems.map((item)=>{
                                  return (
                                      <p className="item" onClick={()=>{
                                          setFood(item);
                                          setVisible(false);
                                          setReset(true);
                                      }} key={item._id}> {item.name} </p>
                                  )
                              })
                          }

                      </div> 
                    ):null
                    // : (
                    //     <div className="notF">
                    //         <img src="/empty.png" alt="" />
                    //         <h2>No result Found</h2>
                    //         <p>Try searching for a different keyword</p>
                    //         <p>or tweek your search a liitle</p>
                    //     </div>

                    // )
                
                }

              </div>

              {/* Animated text hovering
              {
                    
                    placeText?
                    <span className="placeText">
                        <TypingText text="Search for food.... " />
                    </span>:null
              } */}

              {/* Fodd items */}

              {
                    reset&&food!==null?
                    <Food food = {food}/>
                    :
                    (
                        <div className="notF">
                            <img src="/searchfood.png" alt="" />
                            <span className="placeText">
                                <TypingText text="Search For the food item you consumed... " />
                            </span>
                        </div>

                    )
              }

              {/* importing Header Componet */}
              <Header reset={resetVisible}/>

        </section>
    )
}
