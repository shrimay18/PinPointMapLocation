import React, { useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import PinPopupForm from "./PinPopupForm";
import { fetchAddress } from "../services/fetchAddress";
import PinList from "./PinList";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapEvents({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

const MapComponent = ({ pins, addPin }) => {
  const [position, setPosition] = useState(null);
  const mapRef = useRef();

  const handleMapClick = useCallback((latlng) => {
    setPosition(latlng);
  }, []);

  const handlePinSubmit = async (remark) => {
    if (position) {
      try {
        const address = await fetchAddress(position);
        addPin({
          lat: position.lat,
          lng: position.lng,
          remark,
          address,
          timestamp: new Date().toISOString()
        });
        setPosition(null);
      } catch (error) {
        console.error('Error adding pin:', error);
      }
    }
  };

  const handlePinClick = (pin) => {
    const map = mapRef.current;
    if (map) {
      map.flyTo([pin.lat, pin.lng], 13);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%", width: "70%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents onMapClick={handleMapClick} />

        {position && (
          <Marker position={position}>
            <Popup>
              <PinPopupForm onSubmit={handlePinSubmit} />
            </Popup>
          </Marker>
        )}

        {pins.map((pin, index) => (
          <Marker key={index} position={[pin.lat, pin.lng]}>
            <Popup>{pin.remark} - {pin.address}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <PinList pins={pins} onPinClick={handlePinClick} />
    </div>
  );
};

export default MapComponent;