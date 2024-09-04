import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeletingOfficerOrSoldier = () => {
    const { id, type } = useParams();  
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:8000/${type}/${id}/`, {
          method: "DELETE",
          Headers: {
            "content-type": "applications",
          },
        })
          .then((resp) => resp.json())
          .then((resp) => navigate('/'))
          .catch((error) => console.log(error));
      }, [id, type]);
  return (
    <>
    </>
  )
}

export default DeletingOfficerOrSoldier;