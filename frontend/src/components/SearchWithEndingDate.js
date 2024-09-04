import React, { useState } from "react";
import "../styles/SearchWithName.css";
import { Link } from "react-router-dom";
import OptionalRadio from '../helpers/OptionalRadio';

const SearchWithEndingDate = () => {
  const [selectedOption, setSelectedOption] = useState('api_officer');
  const [textValue, setTextValue] = useState("");
  console.log("Type of EndingDate" + typeof ending_date);
  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <OptionalRadio selectedOption={selectedOption} onOptionChange={handleOptionChange}/>
      <div className="box">
        <form className="In">
          <Link to={`/filterEndingDate/${selectedOption}/${textValue}`} className="Submit_1">
            <input type="submit" value="بحث" />
          </Link>
          
          <input
            className="Text"
            type="date"
            value={textValue.toString()}
            onChange={handleTextChange}
          />
        </form>
      </div>
    </>
  );
};

export default SearchWithEndingDate;
