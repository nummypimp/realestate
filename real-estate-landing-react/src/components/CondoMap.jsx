

import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px"
};

const center = { lat: 13.75, lng: 100.55 };

const CondoMap = () => {
  const [condos, setCondos] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAUp8IL2Ex6n7EOOl6erITU5kpYT2Sho5E" // ใส่ API Key ของคุณที่นี่
  });

  useEffect(() => {
    fetch("/api/condos/in-box?minLat=13.6&maxLat=13.9&minLng=100.4&maxLng=100.7")
      .then(res => res.json())
      .then(data => setCondos(data))
      .catch(err => console.error(err));
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3}>
      {condos.map((condo) => (
        <Marker
          key={condo.id}
          position={{ lat: condo.lat, lng: condo.lng }}
          title={condo.CONDO_NAME}
        />
      ))}
    </GoogleMap>
  );
};

export default CondoMap;
