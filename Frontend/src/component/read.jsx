import Header from "./header";
import Footer from "./footer";
import "./css/read.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Read() {

    return (
        <div className="container read-container">
            <div className="read-intro">
                <h1 className="read-name"> Nutrify Blogs!!</h1>
                <h3>Here, You will find </h3>
                <h3>Everything related to Nurition</h3>
            </div>

            <section className="read-blog">
                <section className="banner">
                    <div className="headline">
                        <h2>Want to Write? </h2>
                        <h3>Share Your Nutrition Story on <span className="blogspot">BlogSpot!</span></h3>
                    </div>
                    <div className="ban-img">
                        <img src="/avo.png" alt="" />
                    </div>

                    <a href="https://blogspot-vert.vercel.app/" target="_blank">
                        <button className="write-btn">Write now
                            <FontAwesomeIcon className="tri-icon" icon={faPlay} />
                        </button>
                    </a>
                    
                </section>

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

                <div className="read b2">
                    <img src="/b2.png" alt="" className="blog-img" />


                    <div className="read-text">
                    <h3>Non-Dairy Coffee Creamers </h3>
                    <p>On its own, coffee is a very low-calorie drink that actually provides some antioxidant benefits as well. A cup of black joe will run you only 5 calories and contains no added sugar or fat. However, coffee creamers can add a surprising way more
                         <a href="https://www.eatthis.com/unhealthiest-non-dairy-coffee-creamers/" target="_blank"><span className="read-more">Continue Reading...</span></a> </p>
                    </div> 
                </div>

                <div className="read b3">
                    <img src="/b3.png" alt="" className="blog-img" />

                    <div className="read-text">
                    <h3>6 Health Benefits of Spinach </h3>
                    <p>Spinach (Spinacia oleracea), native to central Asia, is one of the most versatile leafy green vegetables. It contains vitamins and antioxidants that protect you from chronic diseases and promote brain, heart, and eye health.
                         <a href="https://www.health.com/nutrition/groceries/7-health-benefits-spinach" target="_blank"><span className="read-more">Continue Reading...</span></a> </p>
                    </div> 
                </div>

                <div className="read b5">
                    <img src="/b5.png" alt="" className="blog-img" />

                    <div className="read-text">
                    <h3>Health Benefits of Cream Cheese</h3>
                    <p>Some people think of cream cheese as a decadent splurge, while others view it as beneficial in the same way they regard Greek yogurt as a healthful option.Cream cheese is a dairy product made mainly from milk, cream,
                         <a href="https://www.health.com/nutrition/is-cream-cheese-healthy" target="_blank"><span className="read-more">Continue Reading...</span></a> </p>
                    </div> 
                </div>

                <div className="re-b">
                    <button className="btn b-mar" onClick={()=>{
                            window.open("https://www.health.com/", "_blank");
                    }}>Read More  <FontAwesomeIcon className="play-icon" icon={faPlay} style={{color:"white"}} />
                    </button>
                </div>
                
                

            </section>
            {/* importing Header Componet */}
            <Header />

            <Footer/>
        </div>
    );
}
