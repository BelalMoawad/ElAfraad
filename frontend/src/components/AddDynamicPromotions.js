import { useState } from "react";
import '../styles/AddDynamicVacations.css';
import '../styles/Button.css';
import Button from '../helpers/Button';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const AddDynamicPromotions = () => {
    const { id, rank, name, type } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([{ promotion_date: "", promotion_from: "", promotion_to: "" }]);
    console.log("Id " + id);
    const handleAddInput = () => {
      setInputs((prevInputs) => [...prevInputs, { promotion_date: "", promotion_from: "", promotion_to: "" }]);
    };
  
    const handleChange = (event, index) => {
      let { name, value } = event.target;
      setInputs((prevInputs) =>
        prevInputs.map((input, i) =>
          i === index ? { ...input, [name]: value } : input
        )
      );
    };
  
    const handleDeleteInput = (index) => {
      setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
    };
  
    const Post = (postData) => {
      fetch(`http://localhost:8000/${type}/${id}/promotions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate(`/add/${id}/${rank}/${name}/${type}`);
      })
      .catch((error) => {
        console.error(error);
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs.length);
      const nonEmptyInputs = inputs.filter(
        (item) => item.promotion_from.trim() !== "" && item.promotion_to.trim() !== "" && item.promotion_date.trim() !== ""
      );
      nonEmptyInputs.map((item, index) => {
        return Post({"promotion_date": item.promotion_date, "promotion_from": item.promotion_from, "promotion_to": item.promotion_to})
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="Form">
        <Button text="إضافة" type="submit" />
        <div className="bcontainer">
          {inputs.map((item, index) => (
            <div className="input_container" key={index}>  
              <span>تـاريخ التـرقية</span>
              <input 
                name="promotion_date"
                type="date"
                value={item.promotion_date}
                onChange={(event) => handleChange(event, index)}
              />
              <input 
                name="promotion_from"
                type="text"
                value={item.promotion_from}
                onChange={(event) => handleChange(event, index)}
                placeholder="التـرقية مـن"
              />
              <input 
                name="promotion_to"
                type="text"
                value={item.promotion_to}
                onChange={(event) => handleChange(event, index)}
                placeholder="التـرقية إلي"
              />
              
              {inputs.length > 1 && (
                <button onClick={() => handleDeleteInput(index)}>حذف</button>
              )}
              {index === inputs.length - 1 && (
                <button onClick={() => handleAddInput()}>إضافة</button>
              )}
            </div>
          ))}
        </div>
      </form>
    );
}

export default AddDynamicPromotions;