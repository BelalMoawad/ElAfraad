import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/AddingForm.css";
import Label from '../helpers/Label';
import '../styles/Button.css';
import Button from '../helpers/Button';
import OptionalRadio from '../helpers/OptionalRadio';


const AddingForm = () => {
  const navigate = useNavigate();
  const initialOfficerData = {
    military_number: "",
    military_rank: "",
    name: "",
    seniority_number: "",
    national_number: "",
    address: "",
    weapon_name: "",
    workshop_speciality: "",
    marital_status: "",
    entering_army_date: "",
    exit_from_army_date: "",
    religion: "",
    blood_type: "",
  }

  const initialSoldierData = {
    military_number: "",
    military_rank: "",
    name: "",
    national_number: "",
    address: "",
    weapon_name: "",
    workshop_speciality: "",
    marital_status: "",
    entering_army_date: "",
    exit_from_army_date: "",
    religion: "",
    blood_type: "",
  }
  const [selectedOption, setSelectedOption] = useState('api_officer');
  const [officerData, setOfficerData] = useState(initialOfficerData);
  const [soldierData, setSoldierData] = useState(initialSoldierData);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === 'api_officer') {
      setFormData(officerData);
    } else {
      setFormData(soldierData);
    }
  };

  const [formData, setFormData] = useState(officerData);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedOption === 'api_officer') {
      setOfficerData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setSoldierData((prevData) => ({ ...prevData, [name]: value }));
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/${selectedOption}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const params = {
        dataId: data.id,
        dataRank: data.military_rank,
        dataName: data.name,
        dataType: selectedOption
      };
      navigate(`/add/${params.dataId}/${params.dataRank}/${params.dataName}/${params.dataType}`);
    })
    .catch((error) => {
      console.error(error);
    });
  };


  return (
    <>
      <OptionalRadio selectedOption={selectedOption} onOptionChange={handleOptionChange}/>
      <form onSubmit={handleSubmit} className="form-container">
        <Button text="إضافة" type="submit" />
        <div className="form-row">
          {selectedOption === 'api_officer' && 
              <div className="form-item">
                <Label header="رقم الأقدمية" name="seniority_number"
                  value={formData.seniority_number} onChange={handleInputChange} />
              </div>
          }
          <div className="form-item">
            <Label header="إسم" name="name"
              value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="form-item">
            {selectedOption === 'api_officer' && 
              <Label header="رتبة" name="military_rank"
              value={formData.military_rank} onChange={handleInputChange} />
            }
            {selectedOption === 'api_soldier' && 
              <Label header="درجة" name="military_rank"
              value={formData.military_rank} onChange={handleInputChange} />
            }
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
              <Label header="العنوان" name="address"
                value={formData.address} onChange={handleInputChange} />
            </div> 
          <div className="form-item">
              <Label header="الرقم القومي" name="national_number"
                value={formData.national_number} onChange={handleInputChange} />
            </div>
          <div className="form-item">
            <Label header="الرقم العسكري" name="militray_number"
              value={formData.militray_number} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
            <div className="form-item">
              <Label header="الحالة الاجتماعية" name="marital_status"
                value={formData.marital_status} onChange={handleInputChange} />
            </div>
            <div className="form-item">
              <Label header="التخصص بالوحدة" name="workshop_speciality"
                value={formData.workshop_speciality} onChange={handleInputChange} />
            </div>
            <div className="form-item">
              <Label header="إسم السلاح" name="weapon_name"
                value={formData.weapon_name} onChange={handleInputChange} />
            </div>
        </div>

        <div className="form-row">
          <div className="form-item">
              <Label header="الديانة" name="religion"
                value={formData.religion} onChange={handleInputChange} />
          </div> 
          <div className="form-item">
            <label className="xlabel">
              تاريخ التسريح
              <input className="xinput" type="date" name="exit_from_army_date" 
              value={formData.exit_from_army_date} onChange={handleInputChange} />
            </label>
          </div>
          <div className="form-item">
            <label className="xlabel">
              تاريخ الضم
              <input className="xinput" type="date" name="entering_army_date" 
              value={formData.entering_army_date} onChange={handleInputChange} />
            </label>
          </div>
        </div>

        <div className="form-row">
            <div className="form-item">
              <Label header="فصيلة الدم" name="blood_type"
                value={formData.blood_type} onChange={handleInputChange} />
            </div>
        </div>
    </form>
    
  </>
  );
};

export default AddingForm;
