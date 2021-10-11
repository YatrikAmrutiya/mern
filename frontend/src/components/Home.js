import React from 'react'
import '../styles/Home.css'
import logo from '../assets/greenlogo.svg'
//home card
export default function Home() {
    return (
        <div className="main">
            <a href="/metrics/0">
                <div className="main-container " >
                    <img src={logo} />
                    <div className="sub-container">
                        <h4 id="card-header">Metric data visualization</h4>
                        <h5 id="card-text">0 to 23 files</h5>
                    </div>
                </div>
            </a >
        </div>

    )
}
