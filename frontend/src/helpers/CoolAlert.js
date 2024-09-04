import React, { useState } from 'react';
import '../styles/CoolAlert.css';

const CoolAlert = ({message}) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="shaped-modal">
              <p className="modal_message">{message}</p>
              <button className="close-button" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoolAlert;