import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../helpers/Table";
import Button from "../helpers/Button";
import "../styles/OptionalAddingForm.css";
import "../styles/PromotionsShow.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PromotionsShow = () => {
  const { id, type, rank, name } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/${type}/${id}/promotions/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPromotions(resp))
      .catch((error) => console.log(error));
  }, [id, type]);

  const column = [
    { heading: "إلـي", value: "promotion_to", width: "10rem" },
    { heading: "مـن", value: "promotion_from", width: "10rem" },
    { heading: "تاريخ", value: "promotion_date", width: "10rem" },
    { heading: "م", value: "", width: "1rem" },
  ];

  return (
    <div ref={componentRef}>
      <Button text="طباعة" type="text" onClick={handlePrint} />
      <div>
        {promotions.length > 0 ? (
          <div className="Elhabla_3">
            <p className="Above">
              ترقيات {rank} / {name}
            </p>
            <Table data={promotions} column={column} type={type} />
          </div>
        ) : (
          <p className="Above">لا يوجد ترقيات</p>
        )}
      </div>
    </div>
  );
};

export default PromotionsShow;