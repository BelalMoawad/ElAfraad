import { useState } from "react";
import "../styles/AddDynamicPhoneNumbers.css";
import '../styles/Button.css';
import Button from '../helpers/Button';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const AddDynamicPhoneNumbers = () => {
  const { id, rank, name, type } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([{ phoneNumber: "" }]);
  console.log("Id " + id);
  const handleAddInput = () => {
    setInputs((prevInputs) => [...prevInputs, { phoneNumber: "" }]);
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
    fetch(`http://localhost:8000/${type}/${id}/mobile_numbers/`, {
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
      (item) => item.phoneNumber.trim() !== ""
    );
    nonEmptyInputs.map((item, index) => {
      return Post({"mobile_number": item.phoneNumber})
    });
  };

  return (
    <form onSubmit={handleSubmit} className="Form">
      <Button text="إضافة" type="submit" />
      <div className="bcontainer">
        {inputs.map((item, index) => (
          <div className="input_container_1" key={index}>
            <input
              name="phoneNumber"
              type="text"
              value={item.phoneNumber}
              onChange={(event) => handleChange(event, index)}
              placeholder="أدخل رقم الموبايل"
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
};

export default AddDynamicPhoneNumbers;
