import { useContext, useState } from "react"
import { authContext } from "../contexts/authContext"
import Food from "./food";
import Header from "./header"

export const Track = () => {

    const loggedData = useContext(authContext);
    const [foodItems,setFoodItems] = useState([]);
    const [food,setFood] = useState(null);

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
              {/* importing Header Componet */}
                <Header/>
              <div className="search">
                  <input type="search" className="search-inp" onChange={searchFood} placeholder="Search food item" />

                  {
                      // when you type smthg
                      foodItems.length!==0?
                      (
                      <div className="search-results">
                          {
                              foodItems.map((item)=>{
                                  return (
                                      <p className="item" onClick={()=>{
                                          setFood(item);
                                      }} key={item._id}> {item.name} </p>
                                  )
                              })
                          }

                      </div> 
                    )
                    : null
                
                  }

              </div>

              {
                    food!==null?
                    <Food food = {food}/>
                    :null
              }

        </section>
    )
}
