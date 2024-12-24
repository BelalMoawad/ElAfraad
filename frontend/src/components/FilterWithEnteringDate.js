import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";   
import CompleteFilterWithEnteringDate from "./CompleteFilterWithEnteringDate";

const FilterWithEnteringDate = () => {
    const {  type, start } = useParams();
    console.log("Entering_date " + start);
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
      <CompleteFilterWithEnteringDate entering_date={start} soldiers={soldiers} type={type}/>
    </>
  )
}

export default FilterWithEnteringDate;