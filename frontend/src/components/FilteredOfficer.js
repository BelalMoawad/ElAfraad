import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import VerticalTable from '../helpers/VerticalTable';
import '../styles/FilteredSoldier.css';
import '../styles/Officers.css'
import Button from "../helpers/Button";


const FilteredOfficer = () => {
  const { id } = useParams();
  console.log("Id " + id);
  const navigate = useNavigate();
  const [officer, setOfficer] = useState({});
  useEffect(() => {
    fetch(`http://localhost:8000/api_officer/${id}/`, {
      method: "GET",
      Headers: {
        "content-type": "applications",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setOfficer(resp))
      .catch((error) => console.log(error));
  }, [id]);
  
  const columns = [
    { heading: 'رتبة', value: 'military_rank' },
    { heading: 'إسـم', value: 'name'},
    { heading: 'رقم أقدمية', value: 'seniority_number'},
    { heading: 'رقم عسكري', value: 'militray_number'},
    { heading: 'رقم قومي', value: 'national_number'},
     { heading: 'تليفون', value: 'mobile_numbers' },
     { heading: 'عـنـوان مـدنـي', value: 'address'},
     { heading: 'السلاح', value: 'weapon_name'},
     { heading: 'التخصص بالوحدة', value: 'workshop_speciality'},
     { heading: 'الحالة الإجتماعية', value: 'marital_status'},
     { heading: 'تـاريخ الــضـــم', value: 'entering_army_date'},
     { heading: 'تاريخ التسريح', value: 'exit_from_army_date'},
     { heading: 'الديانة', value: 'religion'},
     { heading: 'فصيلة الدم', value: 'blood_type' },
  ]
  const handleDelete = () => {
    navigate(`/deleting/${id}/api_officer`);
  }

  const handlePunishments = () => {
    navigate(`/punishments/${id}/api_officer/${officer.military_rank}/${officer.name}`);
  }
  const handleVacations = () => {
    navigate(`/vacations/${id}/api_officer/${officer.military_rank}/${officer.name}`);
  }
  const handlePromotions = () => {
    navigate(`/promotions/${id}/api_officer/${officer.military_rank}/${officer.name}`);
  }
  
  return (
    <div>
      <Button type="text" text="حذف" onClick={handleDelete}/>
      <VerticalTable data={[officer]} columns={columns} />
      <div className="Elhabla">
        <Button type="text" text="جزاءات" onClick={handlePunishments}/>
        <Button type="text" text="أجازات" onClick={handleVacations}/>
        <Button type="text" text="ترقيات" onClick={handlePromotions}/>
      </div>
    </div>
  );
};

export default FilteredOfficer;
