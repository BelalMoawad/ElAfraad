import { useState, useEffect } from "react";
import '../styles/AddDynamicVacations.css';
import '../styles/Button.css';
import Button from '../helpers/Button';
import { useParams, useNavigate} from "react-router-dom";

const UpdateDynamicPromotions = () => {
  const { id, type } = useParams();
    const navigate = useNavigate();
    const [oldInputs, setOldInputs] = useState([]);
    const [inputs, setInputs] = useState([{ promotion_date: "", promotion_from: "", promotion_to: "" }]);
    console.log("Id " + id);

    useEffect(() => {
      fetch(`http://localhost:8000/${type}/${id}/promotions/`, {
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
      fetch(`http://localhost:8000/${type}/${id}/promotions/${item.id}/`, {
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
        `http://localhost:8000/${type}/${id}/promotions/${postData.id}/`,
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
        return Update({ id: item.id, promotion_date: item.promotion_date, promotion_from: item.promotion_from, promotion_to: item.promotion_to });
      });

      inputs.map((item, index) => {
        return Post({promotion_date: item.promotion_date, promotion_from: item.promotion_from, promotion_to: item.promotion_to})
      });
    };
  return (
    <>
      <form onSubmit={handleSubmit} className="Form">
        <Button text="حـفـظ" type="submit" />
        <div className="bcontainer">
          {oldInputs.map((item, index) => (
            <div className="input_container" key={index}>  
              <span>تـاريخ التـرقية</span>
              <input 
                name="promotion_date"
                type="date"
                value={item.promotion_date}
                onChange={(event) => handleChangeOld(event, index)}
              />
              <input 
                name="promotion_from"
                type="text"
                value={item.promotion_from}
                onChange={(event) => handleChangeOld(event, index)}
                placeholder="التـرقية مـن"
              />
              <input 
                name="promotion_to"
                type="text"
                value={item.promotion_to}
                onChange={(event) => handleChangeOld(event, index)}
                placeholder="التـرقية إلي"
              />
              
              {inputs.length >= 1 && (
                <button onClick={() => handleDeleteOldInput(index, item)}>حذف</button>
              )}
            </div>
          ))}
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
    </>
  )
}

export default UpdateDynamicPromotions;