import React, { useState, useEffect } from "react";
import "../styles/AddDynamicPhoneNumbers.css";
import "../styles/Button.css";
import Button from "../helpers/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateDynamicPhoneNumbers = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [oldInputs, setOldInputs] = useState([]);
  const [inputs, setInputs] = useState([{ phoneNumber: "" }]);

  useEffect(() => {
    fetch(`http://localhost:8000/${type}/${id}/mobile_numbers/`, {
      method: "GET",
      Headers: {
        "content-type": "applications",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setOldInputs(resp))
      .catch((error) => console.log(error));
  }, [id, type]);

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

  const handleChangeOld = (event, index) => {
    let { name, value } = event.target;
    setOldInputs((prevInputs) =>
      prevInputs.map((input, i) =>
        i === index ? { ...input, [name]: value } : input
      )
    );
  };

  const handleDeleteInput = (index) => {
    setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
  };

  const handleDeleteOldInput = (index, item) => {
    setOldInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
    fetch(`http://localhost:8000/${type}/${id}/mobile_numbers/${item.id}/`, {
      method: "DELETE",
      Headers: {
        "content-type": "applications",
      },
    })
      .then((resp) => resp.json())
      .catch((error) => console.log(error));
  };

  const Update = (postData) => {
    fetch(
      `http://localhost:8000/${type}/${id}/mobile_numbers/${postData.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate(`/updating/${type}/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
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
      navigate(`/updating/${type}/${id}`);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(oldInputs.length);
    oldInputs.map((item, index) => {
      return Update({ id: item.id, mobile_number: item.mobile_number });
    });
    
    inputs.map((item, index) => {
      return Post({mobile_number: item.phoneNumber})
    });
  };

  return (
    <form onSubmit={handleSubmit} className="Form">
      <Button text="حـفـظ" type="submit" />
      <div className="bcontainer">
        {oldInputs.map((item, index) => (
          <div className="input_container_1" key={index}>
            <input
              name="mobile_number"
              type="text"
              value={item.mobile_number}
              onChange={(event) => handleChangeOld(event, index)}
              placeholder="أدخل رقم الموبايل"
            />
            {oldInputs.length >= 1 && (
              <button
                onClick={() =>
                  handleDeleteOldInput(index, item)
                }
              >
                حذف
              </button>
            )}
          </div>
        ))}
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

export default UpdateDynamicPhoneNumbers;
