import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import MapComponent from './components/MapComponent';
import './App.css';

const App = () => {
  const [pins, setPins] = useLocalStorage('pins', []);

  const handleAddPin = (newPin) => {
    setPins((currentPins) => [...currentPins, newPin]);
  };

  return (
    <div className="app-container">
      <MapComponent 
        pins={pins} 
        addPin={handleAddPin}
      />
    </div>
  );
};

export default App;