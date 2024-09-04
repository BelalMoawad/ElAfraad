import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../helpers/Table";
import Button from "../helpers/Button";
import "../styles/OptionalAddingForm.css";
import "../styles/VacationsShow.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const VacationsShow = () => {
  const { id, type, rank, name } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/${type}/${id}/vacations/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setVacations(resp))
      .catch((error) => console.log(error));
  }, [id, type]);

  const column = [
    { heading: "إلـي", value: "vacation_to", width: "10rem" },
    { heading: "مـن", value: "vacation_from", width: "10rem" },
    { heading: "م", value: "", width: "1rem" },
  ];

  return (
    <div ref={componentRef}>
      <Button text="طباعة" type="text" onClick={handlePrint} />
      <div>
        {vacations.length > 0 ? (
          <div className="Elhabla_2">
            <p className="Above">
              أجازات {rank} / {name}
            </p>
            <Table data={vacations} column={column} type={type} />
          </div>
        ) : (
          <p className="Above">لا يوجد أجازات</p>
        )}
      </div>
    </div>
  );
};

export default VacationsShow;