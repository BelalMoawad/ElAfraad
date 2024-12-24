import React, { useEffect, useState } from "react";
import Table from '../helpers/Table';
import '../styles/OptionalAddingForm.css';

const CompleteFilterWithEnteringDate = ({ entering_date, soldiers, type }) => {
  const [filteredSoldiers, setFilteredSoldiers] = useState([]);
  console.log("Entering_date " + entering_date);
  
  useEffect(() => {
    const filterYearMonth = (dateString) => {
      const date = new Date(dateString);
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1 // getMonth() returns 0-11, so add 1
      };
    };

    const enteringDateParts = filterYearMonth(entering_date);

    const filtered = soldiers.filter((soldier) => {
      const soldierDateParts = filterYearMonth(soldier.entering_army_date);
      return (
        soldierDateParts.year === enteringDateParts.year &&
        soldierDateParts.month === enteringDateParts.month
      );
    });

    setFilteredSoldiers(filtered);
  }, [soldiers, entering_date]);

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

export default CompleteFilterWithEnteringDate;
