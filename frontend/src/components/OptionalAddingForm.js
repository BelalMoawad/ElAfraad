import React from "react";
import { useParams } from "react-router-dom";
import CoolAlert from "../helpers/CoolAlert";
import "../styles/OptionalAddingForm.css";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../helpers/Card";

const OptionalAddingForm = () => {
  const { id, rank, name, type } = useParams();
  console.log(id);
  console.log(rank);
  console.log(name);

  return (
    <div>
      <CoolAlert message="تـمـت الإضـافة بـنجاح" />
      <p className="Above">
        إدخال بيانات إضافية خاصة {rank} / {name}
      </p>
      <div className="card-container">
        <Link to={`/add/mobile_numbers/${id}/${rank}/${name}/${type}`}>
          <Card name="إضافة أرقام تليفون" Icon={FaPlusSquare} />
        </Link>
        <Link to={`/add/punishments/${id}/${rank}/${name}/${type}`}>
          <Card name="إضافة جزاءات" Icon={FaPlusSquare} />
        </Link>
        <Link to={`/add/vacations/${id}/${rank}/${name}/${type}`}>
          <Card name="إضافة أجازات" Icon={FaPlusSquare} />
        </Link>
        <Link to={`/add/promotions/${id}/${rank}/${name}/${type}`}>
          <Card name="إضافة ترقيات" Icon={FaPlusSquare} />
        </Link>
      </div>
    </div>
  );
};

export default OptionalAddingForm;
