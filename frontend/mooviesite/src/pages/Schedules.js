import React, { useEffect, useState } from "react";
import axios from "axios";
import muuntaja from "xml2js";
import { format } from 'date-fns';
import "./Schedules.css";
import { useLanguage } from '../LanguageContext'; // Import the useLanguage hook

export default function Schedules() {
  const [teatteri, setTeatteri] = useState([]);
  const [alueID, setalueID] = useState("");
  const [aikataulu, setAikataulu] = useState([]);
  const [eventID, seteventID] = useState([]);
  const [schedules, setSchedules] = useState("");
  const [eventname, setEventname] = useState("");
  const [results, setResult] = useState([]);
  const { language } = useLanguage(); // Get the current language from the LanguageContext

  async function getXML() {
    try {
      const response = await axios.get(
        "https://www.finnkino.fi/xml/TheatreAreas/"
      );
      muuntaja.parseString(response.data, (err, result) => {
        const theatrename = result.TheatreAreas.TheatreArea;
        theatrename.splice(1, 1);
        setTeatteri(theatrename);
        const alue = result.TheatreAreas.TheatreArea[0].ID;
        setalueID(alue);
      });
    } catch (error) {
      console.error("XML Error", error);
    }
  }

  useEffect(() => {
    getXML();
  }, []);

  const handleAlueid = async (e) => {
    const selected = e.target.value.toString();
    setalueID(selected);

    try {
      const aikataulut = await axios.get(
        "https://www.finnkino.fi/xml/ScheduleDates/",
        {
          params: {
            area: selected,
          },
        }
      );
      muuntaja.parseString(aikataulut.data, (err, result) => {
        const dates = result.Dates.dateTime;
        setAikataulu(dates);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const eventit = await axios.get("https://www.finnkino.fi/xml/Events/");
      muuntaja.parseString(eventit.data, (err, result) => {
        const events = result.Events.Event;
        const eventTitles = events.map(event => event.Title[0]);
        setEventname(eventTitles);
        seteventID(events);
      });
    } catch (error) { }
  };

  const handleeventid = async (e) => {
    const selected = e.target.value.toString();
    setEventname(selected);
  };

  const handleaikataulu = async (e) => {
    const valittu = e.target.value;
    const date = new Date(valittu);
    const formatted = format(date, "dd.MM.yyyy");
    setSchedules(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const schedule = await axios.get(
        `https://www.finnkino.fi/xml/Schedule/?area=${alueID}&eventID=${eventname}&dt=${schedules}`
      );
      muuntaja.parseString(schedule.data, (err, result) => {
        const data = result.Schedule.Shows;
        setResult(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="finnkino-h1">{language === 'ENG' ? 'Search for showtimes at Finnkino theaters' : 'Etsi näytösaikoja Finnkinon teattereista'}</h1>

      <div className="select-container">
        <select value={alueID} onChange={handleAlueid} className="custom-select">
          {teatteri.map(
            (
              teatteriData,
              index
            ) => (
              <option key={index} value={teatteriData.ID[0]}>
                {teatteriData.Name[0]}
              </option>
            )
          )}
        </select>

        <div className="select-container">
          <select value={eventname} onChange={handleeventid} className="custom-select">
            {eventID.map((eventData, index) => (
              <option key={index} value={eventData.ID}>
                {eventData.Title}
              </option>
            ))}
          </select>
        </div>

        <div className="select-container">
          <select defaultValue={aikataulu[0]} onChange={handleaikataulu} className="custom-select">
            {aikataulu.map((item, index) => (
              <option key={index} value={item}>
                {format(new Date(item), "dd.MM.yyyy")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="finnkino-button">{language === 'ENG' ? 'Find' : 'Etsi'}</button>
          </form>
        </div>
      </div>

      <div className="asd">
  {results && results.length > 0 ? (
    results.map((resultData, index) => (
      <div key={index} className="leffa">
        {resultData.Show && resultData.Show.length > 0 ? (
          resultData.Show.map((show, showIndex) => (
            <div key={showIndex}>
              <h2>{format(new Date(show.dttmShowStart[0]), 'dd.MM.yyyy HH:mm')}</h2>
            </div>
          ))
        ) : (
          <div>{language === 'ENG' ? 'No shows found' : 'Näytöksiä ei löytynyt'}</div>
        )}
      </div>
    ))
  ) : (
    <div>{language === 'ENG' ? 'No results found' : 'Tuloksia ei löytynyt'}</div>
  )}
</div>
    </div>
  );
}
