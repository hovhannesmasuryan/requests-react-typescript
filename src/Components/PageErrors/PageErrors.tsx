import React from "react";
import './PageErrors.css'
import { Link, useNavigate } from "react-router-dom";
function PageErrors(): JSX.Element {
const navigation = useNavigate()
    return (
        		<section className="page_404">
		            <div className="four_zero_four_bg">
                        <button onClick={() => navigation('/') }>Go to Home</button>
			            <h1 className="text-center ">404</h1>
		            </div>
				</section>
    )
}

export default PageErrors