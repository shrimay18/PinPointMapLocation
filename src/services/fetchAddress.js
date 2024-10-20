export const fetchAddress = async (position) => {
    const { lat, lng } = position;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.display_name || "Address not found";
  };
  