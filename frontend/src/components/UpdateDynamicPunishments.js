import { useState, useEffect } from "react";
import '../styles/AddDynamicPunishments.css';
import '../styles/Button.css';
import Button from '../helpers/Button';
import { useParams, useNavigate } from "react-router-dom";

const UpdateDynamicPunishments = () => {
  const { id, type } = useParams();
    const navigate = useNavigate();
    const [oldInputs, setOldInputs] = useState([]);
    const [inputs, setInputs] = useState([{ punishment: "", reason_for_punishment: "" }]);
    console.log("Id " + id);

    useEffect(() => {
      fetch(`http://localhost:8000/${type}/${id}/punishments/`, {
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
      fetch(`http://localhost:8000/${type}/${id}/punishments/${item.id}/`, {
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
        `http://localhost:8000/${type}/${id}/punishments/${postData.id}/`,
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
        navigate(`/updating/${type}/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs.length);
      oldInputs.map((item, index) => {
        return Update({id: item.id, punishment: item.punishment, reason_for_punishment: item.reason_for_punishment})
      });
      inputs.map((item, index) => {
        return Post({punishment: item.punishment, reason_for_punishment: item.reason_for_punishment})
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="Form">
        <Button text="حـفـظ" type="submit" />
        <div className="bcontainer">
        {oldInputs.map((item, index) => (
            <div className="input_container" key={index}>
              <input className="container-input2"
                name="punishment"
                type="text"
                value={item.punishment}
                onChange={(event) => handleChangeOld(event, index)}
                placeholder="أدخل الجزاء"
              />
              <input className="container-input1"
                name="reason_for_punishment"
                type="text"
                value={item.reason_for_punishment}
                onChange={(event) => handleChangeOld(event, index)}
                placeholder="أدخل سبب الجزاء"
              />
              
              {inputs.length >= 1 && (
                <button onClick={() => handleDeleteOldInput(index, item)}>حذف</button>
              )}
            </div>
          ))}
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

export default UpdateDynamicPunishments;