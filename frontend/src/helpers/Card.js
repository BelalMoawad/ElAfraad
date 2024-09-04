import React from 'react';
import { IconContext } from 'react-icons';
import '../styles/Card.css';

const Card = ({ name, Icon }) => {
    return (
        <div className="card">
            <div>
                <IconContext.Provider value={{ size: '2.5rem' }}>
                    <div className="card-icon">
                        <Icon />
                    </div>
                </IconContext.Provider>
            </div>

            <div className="card-name">{name}</div>
        </div>
    );
};

export default Card;
