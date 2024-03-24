import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/authContext";
import Header from "./header";
import "./css/home.css";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';



export default function Home() {
    const loggedData = useContext(authContext);
    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        if (loggedData && loggedData.loggedUser && loggedData.loggedUser.Total) {
            const { totalCaloreis } = loggedData.loggedUser.Total;
            setTotalCalories(totalCaloreis || 0);
        }
    }, [loggedData]);

    const { name } = loggedData.loggedUser;

    const navigate = useNavigate();

    return (
        <div className="container home-container">
            {/* Home */}
            <div className="welcome">
                <article className="wel-text">
                    <article>
                        <h1>Hey {name}!</h1>
                        <p>Good going today!</p>
                    </article>

                    <Link className="user-link" to="/profile">
                        <img className="user-img" src="/user.png" alt="" />
                    </Link>
                </article>

                

                <article className="micros">
                    <h1>{totalCalories} <span className="grey">Calories</span> </h1>
                    <h1>{totalCalories} <span className="grey">Fat</span></h1>
                </article>
            </div>

            <div className="add-food" >
                <h2>Find, track and eat healthy food.</h2>
                <img className="cute-avo" src="/cute-avo.png" alt=""  onClick={()=>{ navigate("/track") }}/>
            </div>

            <section className="record">
                <h2>Track Your Progress!</h2>
                <button className="view-btn" onClick={()=>{
                        navigate("/diet")
                    }}>View now
                    <FontAwesomeIcon className="play-icon" icon={faPlay} />
                </button>
                
            </section>

            <section className="blogs">
                <h2>handPicked For You!!</h2>

                <div className="read b4">
                    <img src="/b4.png" alt="" className="blog-img" />
                    <div className="read-text">
                    <h3>How Much Sugar Should You Eat In a Day?</h3>
                    <p>Sugar can taste delicious, and it provides a quick source of energy. However, many people are becoming more mindful of what they eat, including how much sugar is too much. Popular diets describe the benefits of cutting out sugar and carbohydrates, but not all sugars
                         <a href="https://www.health.com/how-much-sugar-a-day-8421522" target="_blank"><span className="read-more">read more...</span></a> </p>
                    </div> 
                </div>

                <div className="read ">
                    <img src="/b1.png" alt="" className="blog-img" />

                    <div className="read-text">
                    <h3>5-Ingredient Meals for Weight Loss</h3>
                    <p>If weight loss is one of your goals, you may think egg whites and grilled chicken are the only things you can eat. Although these foods are great to include in any diet, including one focused on weight loss, you may be surprised at how many foods you can include in your weight loss
                         <a href="https://www.eatthis.com/5-ingredient-weight-loss-meals/" target="_blank"><span className="read-more">read more...</span></a> </p>
                    </div>  
                </div>

            </section>

            {/* importing Header Componet */}
            <Header />
        </div>
    );
}
