import React, { useEffect } from 'react';
import axios from 'axios';
import muuntaja from 'xml2js';

export default function Schedules() {
    async function getXML() {
       
            axios.get('https://www.finnkino.fi/xml/TheatreAreas/')
            .then( res=> {
                muuntaja.parseString(res.data, (err, result) => {
                result.TheatreAreas.TheatreArea.forEach(e => {
                console.log(e.Name[0]);
                });
            })
                        
         });
             
    } 
    

    useEffect(() => {
        getXML();
    }, []); // [] tarkoittaa, että koodi suoritetaan vain kerran komponentin latauksen yhteydessä

    return (
        <div>Schedules</div>
    );
}