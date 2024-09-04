import { useState } from "react";
import '../styles/AddDynamicVacations.css';
import '../styles/Button.css';
import Button from '../helpers/Button';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const AddDynamicVacations = () => {
    const { id, rank, name, type } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([{ vacation_from: "", vacation_to: "" }]);
    console.log("Id " + id);
    const handleAddInput = () => {
      setInputs((prevInputs) => [...prevInputs, { vacation_from: "", vacation_to: "" }]);
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
      fetch(`http://localhost:8000/${type}/${id}/vacations/`, {
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
        (item) => item.vacation_from.trim() !== "" && item.vacation_to.trim() !== ""
      );
      nonEmptyInputs.map((item, index) => {
        return Post({"vacation_from": item.vacation_from, "vacation_to": item.vacation_to})
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="Form">
        <Button text="إضافة" type="submit" />
        <div className="bcontainer">
          {inputs.map((item, index) => (
            <div className="input_container_2" key={index}>  
              <span>أجـازة مـن</span>
              <input 
                name="vacation_from"
                type="date"
                value={item.vacation_from}
                onChange={(event) => handleChange(event, index)}
              />
              <span>أجـازة إلـي</span>
              <input 
                name="vacation_to"
                type="date"
                value={item.vacation_to}
                onChange={(event) => handleChange(event, index)}
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

export default AddDynamicVacations;