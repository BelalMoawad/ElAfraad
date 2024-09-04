import React, { useState } from "react";
import "../styles/SearchWithName.css";
import { Link } from "react-router-dom";
import OptionalRadio from '../helpers/OptionalRadio';

const SearchWithName = () => {
  const [selectedOption, setSelectedOption] = useState('api_officer');
  const [textValue, setTextValue] = useState("");
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
          <Link to={`/filter_name/${textValue}/${selectedOption}`} className="Submit_1">
            <input type="submit" value="بحث" />
          </Link>
          <input
            className="Text"
            type="text"
            value={textValue}
            onChange={handleTextChange}
            placeholder="أدخـل الإسم ..."
          />
        </form>
      </div>
    </>
  );
};

export default SearchWithName;
