import React, { useEffect, useState } from "react";
import Table from '../helpers/Table';
import '../styles/OptionalAddingForm.css';

const CompleteFilterWithEndingDate = ({ ending_date, soldiers, type }) => {
  const [filteredSoldiers, setFilteredSoldiers] = useState([]);
  console.log("Ending_date " + ending_date);
  
  useEffect(() => {
    const filtered = soldiers.filter((soldier) => {
      return soldier.exit_from_army_date === ending_date;
  });
      setFilteredSoldiers(filtered);
    }, [soldiers, ending_date]);

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
    { heading: 'رقم أقدمية', value: 'seniority_number', width: '40px' },
    { heading: 'رقم عسكري', value: 'militray_number', width: '40px' },
    { heading: 'إسـم', value: 'name', width: '150px' },
    { heading: 'رتبة / درجة', value: 'military_rank', width: '40px' },
    { heading: 'م', value: '', width: '20px' },
  ];

  return (
    <div>
      
      {filteredSoldiers.length > 0 ? (
        <>
          <p className="Above">نتائج البحث</p>
          <Table data={filteredSoldiers} column={column} type={type} />
        </>
      ) : (
        <p className="Above">لا توجد نتائج مطابقة</p>
      )}
    </div>
  );
};

export default CompleteFilterWithEndingDate;
