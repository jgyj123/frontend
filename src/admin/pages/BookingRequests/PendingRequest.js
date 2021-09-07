import React, { useState, useEffect } from "react";
import InnerTabs from "../InnerTabs";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import {CheckBox} from './CheckBox.js'
import { Link, Redirect } from "react-router-dom";
import SpecificReqModal from "../SpecificReqModal/SpecificReqModal";

const PendingRequest = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [bookingRequest, setbookingRequest] = useState([])
    const [currentPage, setCurrentPage] = useState(0);

    const BASEURL = "https://britannic.herokuapp.com/";
  
    const api = axios.create({ baseURL: BASEURL });
    api.defaults.headers.common["Authorization"] = "KEVII1!";
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      api.get("/api/v1/bookingreq/all").then((res) => {
        console.log(res);
        setbookingRequest(res.data.bookingRequest.slice(0,res.data.bookingRequest.length));
  
      });
    }
  
    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    const currentPageData = bookingRequest.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(bookingRequest.length / PER_PAGE);
  
    function openModal() {
      // fetchData();
      setIsOpen(true);
    }

    function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
    }

    const handleRowCLick= (id) => {
    } 
    
    return (
        <div>
        <table>
            <thead>
                <th><CheckBox></CheckBox></th>
                <th className='BookingRequestPageVenueHeader'>Venue</th>
                <th className='BookingRequestPageCCAHeader'>CCA</th>
                <th className='BookingRequestPageTimeBookedHeader'>Time Booked</th>
                <th className='BookingRequestPagePurposeHeader'>Purpose</th>
                <th></th>
            </thead>
                {currentPageData.map((req) => 
                <tbody>
                    <tr onClick={() => handleRowCLick(req.id)}>
                    <td><CheckBox></CheckBox></td>
                    <td>{req.venue.name}</td> 
                    <td>{req.cca}</td>
                    <td style={{display: 'inline-flex', justifyContent:"space-around"}}>{req.timingSlots.map((slot) =>
                        <div style={{padding:'4px',marginRight:'4px',background: "#ECDBBA", borderRadius: '1px', fontWeight:'500'}}>
                            {slot}
                        </div>
                    )}</td>
                    <td>{req.notes}</td>
                    <td> 
                    <SpecificReqModal req={req} bookingRequests={bookingRequest}/>
                    </td>
                    </tr>
                </tbody>
                )}
        </table>
        
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
    </div>
    )
}

export default PendingRequest
