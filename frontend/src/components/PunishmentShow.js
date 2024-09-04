import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../helpers/Table";
import Button from "../helpers/Button";
import "../styles/OptionalAddingForm.css";
import "../styles/PunishmentShow.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PunishmentShow = () => {
  const { id, type, rank, name } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [punishments, setPunishments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/${type}/${id}/punishments/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPunishments(resp))
      .catch((error) => console.log(error));
  }, [id, type]);

  const column = [
    { heading: "سبب الجزاء", value: "reason_for_punishment", width: "15rem" },
    { heading: "الجزاء", value: "punishment", width: "5rem" },
    { heading: "م", value: "", width: "1rem" },
  ];

  return (
    <div ref={componentRef}>
      <Button text="طباعة" type="text" onClick={handlePrint} />
      <div>
        {punishments.length > 0 ? (
          <div className="Elhabla_1">
            <p className="Above">
              جزاءات {rank} / {name}
            </p>
            <Table data={punishments} column={column} type={type} />
          </div>
        ) : (
          <p className="Above">لا يوجد جزاءات</p>
        )}
      </div>
    </div>
  );
};

export default PunishmentShow;