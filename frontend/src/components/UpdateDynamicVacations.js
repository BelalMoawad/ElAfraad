import { useState, useEffect } from "react";
import '../styles/AddDynamicVacations.css';
import '../styles/Button.css';
import Button from '../helpers/Button';
import { useParams, useNavigate } from "react-router-dom";

const UpdateDynamicVacations = () => {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [oldInputs, setOldInputs] = useState([]);
    const [inputs, setInputs] = useState([{ vacation_from: "", vacation_to: "" }]);
    console.log("Id " + id);

    useEffect(() => {
      fetch(`http://localhost:8000/${type}/${id}/vacations/`, {
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
      fetch(`http://localhost:8000/${type}/${id}/vacations/${item.id}/`, {
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
        `http://localhost:8000/${type}/${id}/vacations/${postData.id}/`,
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
        return Update({id: item.id, vacation_from: item.vacation_from, vacation_to: item.vacation_to})
      });
      inputs.map((item, index) => {
        return Post({vacation_from: item.vacation_from, vacation_to: item.vacation_to})
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="Form">
        <Button text="حـفـظ" type="submit" />
        <div className="bcontainer">
          {oldInputs.map((item, index) => (
            <div className="input_container_2" key={index}>  
              <span>أجـازة مـن</span>
              <input 
                name="vacation_from"
                type="date"
                value={item.vacation_from}
                onChange={(event) => handleChangeOld(event, index)}
              />
              <span>أجـازة إلـي</span>
              <input 
                name="vacation_to"
                type="date"
                value={item.vacation_to}
                onChange={(event) => handleChangeOld(event, index)}
              />
              
              {inputs.length >= 1 && (
                <button onClick={() => handleDeleteOldInput(index, item)}>حذف</button>
              )}
            </div>
          ))}
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

export default UpdateDynamicVacations;