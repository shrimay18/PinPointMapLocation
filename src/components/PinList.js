import React from "react";
import './PinList.css';

const PinList = ({ pins, onPinClick }) => {
  return (
    <div className="pin-list-container">
      <h2>Saved Pins</h2>
      <div className="pins-list">
        {pins.length === 0 ? (
          <p className="no-pins">No pins added yet. Click on the map to add a pin.</p>
        ) : (
          <ul>
            {pins.map((pin, index) => (
              <li 
                key={index} 
                onClick={() => onPinClick(pin)}
                className="pin-item"
              >
                <div className="pin-content">
                  <strong>{pin.remark}</strong>
                  <p className="pin-address">{pin.address}</p>
                  <small>{new Date(pin.timestamp).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PinList;