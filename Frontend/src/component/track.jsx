import { useContext, useEffect, useState } from "react"
import { authContext } from "../contexts/authContext"
import Food from "./food";
import Header from "./header"
import "./css/track.css"
import { useNavigate } from "react-router-dom";
import TypingText from "./Animation/typingText";
import{ FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faArrowLeft,faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";


export default function Track(){

    const loggedData = useContext(authContext);
    const [foodItems,setFoodItems] = useState([]);
    const [food,setFood] = useState(null);


    const [visible,setVisible] = useState(false);

    const navigate = useNavigate();


    // onClick of home icon food should be gone 
    const [reset,setReset] = useState(true);   //var for track og
    function resetVisible(){
        setReset(false);
    };

    const [searchValue, setSearchValue] = useState('');
    function setName(item){
        setSearchValue(item.name); // Set the search input value to item.name
    };

    function searchFood(event){
        // If you type something in the search box
        setSearchValue(event.target.value);

        // fetch data from db only if there's a value
        if(event.target.value.length!==0){
            // fetch data from db
            fetch(`https://nutrify-api.vercel.app/foods/${event.target.value}`,{
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
            setSearchValue('');
        }
    }

    return (
        
        <section className="container track-container" >
                <div className="back-arrow">
                    <FontAwesomeIcon className="bak-arr" icon={faArrowLeftLong} style={{color: "#49b46d",}}  onClick={()=>{
                        navigate("/home")
                    }}/>
                    {/* <FontAwesomeIcon className="bak-arr" icon={faArrowLeft} style={{color: "#49b46d",}}  onClick={()=>{
                    navigate("/home")
                }} />  */}
                    <p>Add Food items</p>
                </div>
              <div className="search">
                    <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} style={{color: "#49b46b",}} />

                    <input type="search" className="search-inp"
                    onClick={()=>{
                        setVisible(true);
                    }}
                    onChange={searchFood} 
                    placeholder="Search for food..."
                    value={searchValue}
                    /> 
                

                {
                      // when you type smthg
                      visible&&foodItems.length!==0?
                      (
                        <div className="search-results">
                            {
                                foodItems.map((item)=>{
                                    return (
                                    <div className="search-item" key={item._id}>
                                        <p className="food-item" onClick={()=>{
                                            setFood(item);
                                            setVisible(false);
                                            setReset(true);
                                            setName(item);
                                        }} > {item.name} </p>
                                    </div>   
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
              <div className="addFoot">
              <Header reset={resetVisible}/>
              </div>
              
              

        </section>
    )
}
