import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/authContext";
import Header from "./header";
import Footer from "./footer";
import "./css/home.css";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';



export default function Home() {
    const loggedData = useContext(authContext);
    
    // current Date diet Track
    const [date, setDate] = useState(formatDate(new Date())); // Initialize with formatted today's date
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

    // Initialy when you hadn't eaten
    let [total, setTotal] = useState({
        totalCaloreis: 0,
        totalProtein: 0
    })

    useEffect(()=>{
        fetch(`https://nutrify-api.vercel.app/track/${loggedData.loggedUser.userid}/${date}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{

            let totalCopy = {
                totalCaloreis: 0,
                totalProtein: 0
            };
        
            data.forEach((item) => {
                if (item.details) {
                    totalCopy.totalCaloreis += item.details.calories || 0;
                    totalCopy.totalProtein += item.details.protein || 0;
                }
            });
        
            // setting Total to totalCopy data
            setTotal(totalCopy);
        })

        .catch((err)=>{
            console.log(err);
        })
    }, [loggedData])


    const { name } = loggedData.loggedUser;

    const navigate = useNavigate();

    return (
        <div className="container home-container">
            {/* Home */}
            <div className="welcome">
                <article className="wel-text">
                    <article className="intro-n">
                        <h1>Hey {name}!</h1>
                        <p>Good going today!</p>
                    </article>

                    <Link className="user-link" to="/profile">
                        <img className="user-img" src="/user.png" alt="" />
                    </Link>
                </article>

                

                <article className="micros">
                    <h1>{total.totalCaloreis} <span className="grey">Calories</span> </h1>
                    <h1>{total.totalProtein} <span className="grey">Protein</span></h1>
                </article>
            </div>


            <section className="home-ban">
                <div className="ban-adds">
                    <section className="add-food" >
                        <article className="food-tagline">
                            <h2 className="moto-line">Find, track and eat healthy food.</h2>
                            <div className="f-subtag">
                                <h3>Discover, Monitor, and Savor Nutrient-Rich Choices</h3>
                                <h3>Explore, Monitor, and Indulge in Healthful Eating Habits</h3>
                            </div>
                        </article>
                        
                        <img className="cute-avo" src="/cute-avo.png" alt="" />
                    </section>

                    <section className="record">
                        <article className="food-tagline">
                            <h2>Track Your Progress!</h2>
                            <div className="f-subtag">
                                <h3> Monitor Your Journey to Success</h3>
                                <h3> Watch Your Progress Unfold</h3>
                            </div>
                        </article>
                        <button className="view-btn" onClick={()=>{
                                navigate("/diet")
                            }}>View now
                            <FontAwesomeIcon className="play-icon" icon={faPlay} />
                        </button>
                        
                    </section>
                </div>

                

                <section className="blogs">
                    <h2>HandPicked For You!!</h2>

                    <div className="read b4">
                        <img src="/b4.png" alt="" className="blog-img" />
                        <div className="read-text">
                        <h3>How Much Sugar Should You Eat In a Day?</h3>
                        <p>Sugar can taste delicious, and it provides a quick source of energy. However, many people are becoming more mindful of what they eat, including how much sugar is too much. Popular diets describe the benefits of cutting out sugar and carbohydrates, but not all sugars
                            <a href="https://www.health.com/how-much-sugar-a-day-8421522" target="_blank"><span className="read-more">Continue Reading...</span></a> </p>
                        </div> 
                    </div>

                    <div className="read ">
                        <img src="/b1.png" alt="" className="blog-img" />

                        <div className="read-text">
                        <h3>5-Ingredient Meals for Weight Loss</h3>
                        <p>If weight loss is one of your goals, you may think egg whites and grilled chicken are the only things you can eat. Although these foods are great to include in any diet, including one focused on weight loss, you may be surprised at how many foods you can include in your weight loss
                            <a href="https://www.eatthis.com/5-ingredient-weight-loss-meals/" target="_blank"><span className="read-more">Continue Reading...</span></a> </p>
                        </div>  
                    </div>

                    <div className="re-b">
                        <button className="btn re-b" onClick={()=>{
                                navigate("/read")
                            }} >Read More  <FontAwesomeIcon className="play-icon" icon={faPlay} style={{color:"white"}} />
                        </button>
                    </div>
                    

                </section>
            </section>
            

            {/* importing Header Componet */}
            <Header />
            <Footer/>
        </div>
    );
}
