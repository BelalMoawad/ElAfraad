import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompleteFilterWithName from "./CompleteFilterWithName";

const FilterWithName = () => {
  const { name, type } = useParams();
  console.log("Name " + name);
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
        <CompleteFilterWithName name={name} soldiers={soldiers} type={type}/>
    </>

  );
};

export default FilterWithName;