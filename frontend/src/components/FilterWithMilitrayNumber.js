import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";   
import CompleteFilterWithMilitrayNumber from "./CompleteFilterWithMilitrayNumber";

const FilterWithMilitrayNumber = () => {
    const {  type, milNumber } = useParams();
    console.log("Militray Number " + milNumber);
    console.log("Type " + type);
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
      <CompleteFilterWithMilitrayNumber milNumber={milNumber} soldiers={soldiers} type={type}/>
    </>
  )
}

export default FilterWithMilitrayNumber;