import React from 'react'
import "./css/footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
        <footer >
            <div className="col">
                <img src="/Nutrify.png" alt="" className='logo' />
                <h4>Contact</h4>
                <p><strong>Address:</strong>B2/238 Cyber Police Station Road, Rohini Sector 17, New Delhi</p>
                <p><strong>Phone:</strong>+01 2222 3665 / (+91) 01 2345 6763</p>
                <p><strong>Hours:</strong>10:00 - 18:00, Mon - Sat</p>
            
                <div className="follow">
                    <h4>Follow us</h4>
                    <div className="icon">
                        <FontAwesomeIcon className='f-icon' icon={faSquareFacebook} />
                        <FontAwesomeIcon className='f-icon'icon={faInstagram} />
                        <FontAwesomeIcon className='f-icon' icon={faLinkedin} />
                        <FontAwesomeIcon className='f-icon' icon={faTwitter} />   
                    </div>
                </div>
            </div>
            <div className="col">
                <h4>About</h4>
                <a href="#">About Us</a>
                <a href="#">Delivery Information</a>
                <a href="#">Privacy Poilcy</a>
                <a href="#">Terms & Condition</a>
                <a href="#">Contact Us</a>
            </div>
            
            <div className="col install">
                <h4>Install App</h4>
                <p>From App Store or Google Play</p>
                <div className="row">
                    <img src="/Footer/app.jpg" alt="app" />
                    <img src="/Footer/play.jpg" alt="play" />                
                </div>
                    
                <p>Secured Payment Gateways</p>
                <img src="/Footer/pay.png" alt="pay" />
            </div>

            <div className="copyright">
                <p>©2024 Anurag Kumar. All Rights Reseverd.</p>
            </div>

        

        </footer>
  )
}
