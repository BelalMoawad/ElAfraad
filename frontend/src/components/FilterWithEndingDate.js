import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";   
import CompleteFilterWithEndingDate from "./CompleteFilterWithEndingDate";

const FilterWithEndingDate = () => {
    const {  type, end } = useParams();
    console.log("Endig_date " + end);
    console.log("Type " + type);
    console.log("Full URL:", window.location.href); 
    const [soldiers, setSoldiers] = useState([]);
    
    useEffect(() => {
      fetch(`http://localhost:8000/${type}/`, {
        method: "GET",
        Headers: {
          "content-type": "applications",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => setSoldiers(resp))
        .catch((error) => console.log(error));
    }, []);
  return (
    <>
      <CompleteFilterWithEndingDate ending_date={end} soldiers={soldiers} type={type}/>
    </>
  )
}

export default FilterWithEndingDate;