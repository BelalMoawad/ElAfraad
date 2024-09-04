import { useState } from "react";
import '../styles/AddDynamicPunishments.css';
import '../styles/Button.css';
import Button from '../helpers/Button';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const AddDynamicPunishments = () => {
    const { id, rank, name, type } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([{ punishment: "", reason_for_punishment: "" }]);
    console.log("Id " + id);
    const handleAddInput = () => {
      setInputs((prevInputs) => [...prevInputs, { punishment: "", reason_for_punishment: "" }]);
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
      fetch(`http://localhost:8000/${type}/${id}/punishments/`, {
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
        (item) => item.punishment.trim() !== "" && item.reason_for_punishment.trim() !== ""
      );
      nonEmptyInputs.map((item, index) => {
        return Post({"punishment": item.punishment, "reason_for_punishment": item.reason_for_punishment})
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="Form">
        <Button text="إضافة" type="submit" />
        <div className="bcontainer">
          {inputs.map((item, index) => (
            <div className="input_container" key={index}>
              <input className="container-input2"
                name="punishment"
                type="text"
                value={item.punishment}
                onChange={(event) => handleChange(event, index)}
                placeholder="أدخل الجزاء"
              />
              <input className="container-input1"
                name="reason_for_punishment"
                type="text"
                value={item.reason_for_punishment}
                onChange={(event) => handleChange(event, index)}
                placeholder="أدخل سبب الجزاء"
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

export default AddDynamicPunishments;