import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from '../helpers/Table';
import '../styles/Officers.css';

const OffierHelpersVsSoldiers = () => {
    const { name } = useParams();
    console.log("Name " + name);
    const [soldiers, setSoldiers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/api_soldier/", {
            method: "GET",
            Headers: {
                "content-type": "applications",
            },
        })
            .then((resp) => resp.json())
            .then((resp) => setSoldiers(resp))
            .catch((error) => console.log(error));
    }, []);

    console.log("Soldiers ", soldiers);
    const [filteredSoldiers, setFilteredSoldiers] = useState([]);
    const filtered = (name === "جندي" ? soldiers.filter((soldier) => soldier.military_rank === "جندي")
        : soldiers.filter((soldier) => soldier.military_rank !== "جندي"));
    console.log("Filtered Data: ", filtered)
    useEffect(() => {
        setFilteredSoldiers(filtered);
    }, [filtered]);
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
        { heading: 'إسـم', value: 'name', width: '150px' },
        { heading: 'درجة', value: 'military_rank', width: '40px' },
        { heading: 'م', value: '', width: '20px' },
      ]
    return (
        <div>
            {name !== "جندي" ? <h1 className="heading">بيـانـات ضباط الصف</h1>:
            <h1 className="heading">بيـانـات الجنود</h1>}
            <Table data={filteredSoldiers} column={column} type="api_soldier"/>
        </div>
    )
}

export default OffierHelpersVsSoldiers;