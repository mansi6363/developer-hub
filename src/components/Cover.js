import React from 'react'
import chatIcon from '../chatIcon.svg'
import '../App.css';


//this function return cover section of the web page
function cover(){
    return(
        <section id="cover">

            <div className="sec-division" id="cover-image">
                <img src={chatIcon} alt="chat icon"/>
            </div>
            
            <div className="sec-division" id="cover-text">
                <h2>
                    <span id="cover-text-1"> Learn </span>|<span id="cover-text-2"> Share </span>
                </h2>
            </div>
        </section>
    );
}

export default cover;