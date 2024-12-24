import React, { useEffect, useState} from "react";
import Table from '../helpers/Table';
import '../styles/Officers.css'


const Officers = () => {
    const [officers, setOfficers] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/api_officer/", {
        method: "GET",
        Headers: {
          "content-type": "applications",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => setOfficers(resp))
        .catch((error) => console.log(error));
    }, []);

    const column = [
      { heading: 'فصيلة الدم', value: 'blood_type', width: '5px' },
      { heading: 'الديانة', value: 'religion', width: '20px' },
      { heading: 'تاريخ التسريح', value: 'exit_from_army_date', width: '80px' },
      { heading: 'تـاريخ الــضـــم', value: 'entering_army_date', width: '80px' },
      { heading: 'الحالة الإجتماعية', value: 'marital_status', width: '20px' },
      { heading: 'التخصص بالوحدة', value: 'workshop_speciality', width: '20px' },
      { heading: 'السلاح', value: 'weapon_name', width: '30px' },
      { heading: 'عـنـوان مـدنـي', value: 'address', width: '70px' },
      { heading: 'تليفون', value: 'mobile_numbers', width: '15px' },
      { heading: 'رقم قومي', value: 'national_number', width: '40px' },
      { heading: 'رقم عسكري', value: 'militray_number', width: '40px' },
      { heading: 'رقم أقدمية', value: 'seniority_number', width: '30px' },
      { heading: 'إسـم', value: 'name', width: '150px' },
      { heading: 'رتبة', value: 'military_rank', width: '40px' },
      { heading: 'م', value: '', width: '20px' },
    ]


    return (
        <div>
            <h1 className="heading">بيـانـات الضباط</h1>
            <Table data={officers} column={column} type="api_officer"/>
        </div>
    );
};
export default Officers;

