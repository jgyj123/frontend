import "./TestBookingPage.css";
import React, { useState } from "react";
import { useRef } from "react";
import { useLocation, useParams } from "react-router";
import StatusBar from "../shared/StatusBar";
import { Link } from "react-router-dom";

const DATA = [
  { id: 0, timeStart: "08:00", timeEnd: "09:00", selected: false },
  { id: 1, timeStart: "09:00", timeEnd: "10:00", selected: false },
  { id: 2, timeStart: "10:00", timeEnd: "11:00", selected: false },
  { id: 3, timeStart: "11:00", timeEnd: "12:00", selected: false },
  { id: 4, timeStart: "12:00", timeEnd: "13:00", selected: false },
  { id: 4, timeStart: "13:00", timeEnd: "14:00", selected: false },
];

const TestBookingPage = () => {
  const { venueName } = useParams();
  const { selectedDate } = useLocation().state;
  const [timeIntervals, setTimeIntervals] = useState(DATA);
  const [cca, setCCA] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isActive, setIsActive] = useState("");
  const OnClick = () => setIsActive(!isActive);


  function handleTimeSelect(id) {
    DATA[id].selected = !DATA[id].selected;
    setTimeIntervals(DATA);
    console.log(id);
    console.log(DATA[id].selected);
  }

  return (
    <div class="mainDiv">
      <div class="Statusbar">
        <StatusBar stage="3" />
      </div>
      <form class="contents" action="">
        <div class="row">
          <h2 class="Titles">VENUE</h2>
          <h3 class="black">{venueName}</h3>
        </div>

        <div class="row">
          <h2 class="Titles">TIME</h2>
          <h3 class="black">{selectedDate.toDateString()}</h3>
        </div>

        <div class="row">
          <h2 class="Titles">EMAIL</h2>
          <input
            type="text"
            id="Email"
            name="Email"
            placeholder="e0123456@u.nus.edu.sg"
            required
          ></input>
        </div>

        <div class="row">
          <h2 class="Titles">PURPOSE</h2>
          <div className = "radio">
          <input
            type="radio"
            id="CCA"
            name="Purpose"
            value="CCA"
            value={cca}
            onChange={(event) => {
              setPurpose(event.target.value);
              OnClick();
            }}
          ></input>
          <label for="CCA">CCA</label>
          <input
            type="radio"
            id="Personal"
            name="Purpose"
            value="Personal"
            value={purpose}
            onChange={(event) => {
              setPurpose(event.target.value);
              OnClick();
            }}
          ></input>
          <label for="Personal">Personal</label>
          </div>
        </div>
        
        <div className="row">
          <h2 className="Titles" id = "Detail">DETAILS</h2>
          <div className = "multipleRows">
            {isActive && <div className = "active">
              <select
              id="HallCCA"
              name="HallCCA"
              required
              >
                <option value='' disabled selected>Hall CCA</option>
                <option>KE WEB</option>
              </select>
              </div>
            }
            <input type="text" id="Details" name="VenueSize" placeholder="Venue Size" required />
            <div className="row" style={{ height: "10vh" }}>
              <textarea
              type="text"
              id="Details"
              name="HallCCA"
              placeholder = "Details"
              required
              rows="4"
              cols="60"
              style={{ height: "8vh" }}
              />
            </div>
          </div>
        </div>
     
      </form>

      <div className="bottomNavigation">
        <Link class="backButton" to={`/vbs/${venueName}`}>
          Back
        </Link>
        {true ? (
          <p></p>
        ) : (
          <p
            style={{
              fontFamily: '"Roboto Condensed", sans-serif',
              margin: "1% 0",
            }}
          >
            Fill all fields to Submit
          </p>
        )}
        {true ? (
          <Link
            to={{
              pathname: `/vbs/confirmation`,
            }}
            class="submitButton enabled"
          >
            Submit
          </Link>
        ) : (
          <div class="submitButton disabled">Submit</div>
        )}
      </div>
    </div>
  );
};

export default TestBookingPage;
