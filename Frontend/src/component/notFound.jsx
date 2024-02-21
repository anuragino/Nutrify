import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <section className="container">
            <div className="nf">
                <h1>404 | Not Found</h1>
                <p> <Link className='link' to='/register'>Register Now</Link>  to Use!!</p>
            </div>
        </section>
        
    )
}