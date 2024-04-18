import React, { useEffect, useState } from "react";
import axios from "axios";
import muuntaja from "xml2js";
import { format } from 'date-fns';

export default function Schedules() {
  const [teatteri, setTeatteri] = useState([]);
  const [alueID, setalueID] = useState("");
  const [aikataulu, setAikataulu] = useState([]);
  const [eventID, seteventID] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [eventname, setEventname]= useState("");
  const [result, setResult]=useState("")
  async function getXML() {
    try {
      const response = await axios.get(
        "https://www.finnkino.fi/xml/TheatreAreas/"
      ); //linkki teatterisijainneille
      muuntaja.parseString(response.data, (err, result) => {
        // muunnettaan saatu data parseStringillä javascript objektiksi

        const theatrename = result.TheatreAreas.TheatreArea; //luodaan taulukko mapilla ja otetaan ylös kaikki nimet
        theatrename.splice(1, 1);
        setTeatteri(theatrename);
        const alue = result.TheatreAreas.TheatreArea[0].ID;
        setalueID(alue);
        // console.log(alueID);
      });
    } catch (error) {
      console.error("XML ERror", error);
    }
  }

  useEffect(() => {
    getXML();
  }, []); // [] tarkoittaa, että koodi suoritetaan vain kerran komponentin latauksen yhteydessä

  useEffect(() => {
    console.log("aaaa" + alueID);
  }, [alueID]);

  const handleAlueid = async (e) => {
    const selected = e.target.value.toString();
    console.log(typeof selected);
    setalueID(selected);
    

    try {
      const aikataulut = await axios.get(
        //haetaan tällä functiolla teatterien aikataulut
        "https://www.finnkino.fi/xml/ScheduleDates/",
        {
          params: {
            area: selected, // annetaan alueen id getin parametriksi
          },
        }
      );
      muuntaja.parseString(aikataulut.data, (err, result) => {
        //muunnetaan saatu data parsestringillä

        const time = result.Dates // tallennetaan saatu data time muuttujaan.
        //const times  = time.map(time => time)
        const dates = result.Dates.dateTime
        const yksiaika = result.Dates.dateTime[0]
        setAikataulu(dates); // asetetaan objekti aikataulu muuttujaan
        console.log(yksiaika);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const eventit = await axios.get("https://www.finnkino.fi/xml/Events/"); //haetaan tällä functiolla teatterien aikataulut
      muuntaja.parseString(eventit.data, (err, result) => {
        const events  = result.Events.Event
        const eventTitles  = events.map(event => event.Title[0])
        setEventname(eventTitles)
        console.log(events);
        seteventID(events);
      });
    } catch (error) {}

    
  };

const handleeventid = async (e) => {
  const selected = e.target.value.toString();
  setEventname(selected)
  
  
}

const handleaikataulu = async (e) => {
const valittu = e.target.value

const date = new Date(valittu)
const formatted = format(date, "dd.MM.yyyy")

setSchedules(formatted)
}

const handleSubmit =  async (e) => {
  e.preventDefault();

  try {
    const schedule = await axios.get(
      `https://www.finnkino.fi/xml/Schedule/?area=${alueID}&eventID=${eventname}&dt=${schedules}`
    );
    
    muuntaja.parseString(schedule.data, (err, result) => {
      const data = result.Schedule.Shows
      setSchedules(data)
      console.log(schedules);
    }
    
  )} catch (error) {
    console.log(error);
  }
}

  return (
    <div>
      <select value={alueID} onChange={handleAlueid}>
        {teatteri.map(
          (
            teatteriData,
            index // Käydään läpi teatteri taulukko ja luodaan jokaiselle teatterille optioni. seuraavalla rivillä tallennetaan jokaiselle optiolle id arvo. seuraavalla rivillä näytetään jokaisen teatterin nimi
          ) => (
            <option key={index} value={teatteriData.ID[0]}>
              {teatteriData.Name[0]}
            </option>
          )
        )}
      </select>

      <div>
        <select value = {eventname}onChange={handleeventid}>
          {eventID.map((eventData, index) => (
            <option key={index} value={eventData.ID}>
              {eventData.Title}
            </option>
          ))}
        </select>
      </div>
      
      <div>
      <select defaultValue={aikataulu[0]} onChange={handleaikataulu}>
      {aikataulu.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
  ))}
</select>
        </div>
      <div>
        <form onSubmit={handleSubmit}>
        <button type = "submit"> Find</button>
        </form>
      </div>
      
 

      
      
    </div>
  );
}
