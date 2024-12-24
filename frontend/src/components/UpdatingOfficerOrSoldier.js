import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/AddingForm.css";
import Label from "../helpers/Label";
import "../styles/Button.css";
import Button from "../helpers/Button";
import "../styles/OptionalAddingForm.css";
import { FaEdit  } from "react-icons/fa";
import Card from "../helpers/Card";

const UpdatingOfficerOrSoldier = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});


  useEffect(() => {
    fetch(`http://localhost:8000/${type}/${id}/`, {
      method: "GET",
      Headers: {
        "content-type": "applications",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setFormData(resp))
      .catch((error) => console.log(error));
  }, [id, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/${type}/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <Button text="حـفـظ" type="submit" />
        <div className="form-row">
          {type === "api_officer" && (
            <div className="form-item">
              <Label
                header="رقم الأقدمية"
                name="seniority_number"
                value={formData.seniority_number}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="form-item">
            <Label
              header="إسم"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            {type === "api_officer" && (
              <Label
                header="رتبة"
                name="military_rank"
                value={formData.military_rank}
                onChange={handleInputChange}
              />
            )}
            {type === "api_soldier" && (
              <Label
                header="درجة"
                name="military_rank"
                value={formData.military_rank}
                onChange={handleInputChange}
              />
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <Label
              header="العنوان"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <Label
              header="الرقم القومي"
              name="national_number"
              value={formData.national_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <Label
              header="الرقم العسكري"
              name="militray_number"
              value={formData.militray_number}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <Label
              header="الحالة الاجتماعية"
              name="marital_status"
              value={formData.marital_status}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <Label
              header="التخصص بالوحدة"
              name="workshop_speciality"
              value={formData.workshop_speciality}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <Label
              header="إسم السلاح"
              name="weapon_name"
              value={formData.weapon_name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <Label
              header="الديانة"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-item">
            <label className="xlabel">
              تاريخ التسريح
              <input
                className="xinput"
                type="date"
                name="exit_from_army_date"
                value={formData.exit_from_army_date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-item">
            <label className="xlabel">
              تاريخ الضم
              <input
                className="xinput"
                type="date"
                name="entering_army_date"
                value={formData.entering_army_date}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <Label
              header="فصيلة الدم"
              name="blood_type"
              value={formData.blood_type}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="card-container">
        <Link to={`/update/mobile_numbers/${id}/${type}`}>
          <Card name="أرقام تليفون" Icon={FaEdit} />
        </Link>
        <Link to={`/update/punishments/${id}/${type}`}>
          <Card name="جزاءات" Icon={FaEdit} />
        </Link>
        <Link to={`/update/vacations/${id}/${type}`}>
          <Card name="أجازات" Icon={FaEdit} />
        </Link>
        <Link to={`/update/promotions/${id}/${type}`}>
          <Card name="ترقيات" Icon={FaEdit} />
        </Link>
      </div>    
      </form>
    </>
  );
};

export default UpdatingOfficerOrSoldier;