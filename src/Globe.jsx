import React, { useMemo } from 'react';
import ReactGlobe from 'react-globe';
import * as THREE from 'three';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './App.css';

export function MyGlobe() {
  const markers = [
    { id: 'marker1', city: 'Antalya', price: 'от 6750 с.', coordinates: [36.8969, 30.7133], value: 50 },
    { id: 'marker2', city: 'Singapore', price: 'от 7850 с.', coordinates: [1.3521, 103.8198], value: 50 },
    { id: 'marker3', city: 'New York', price: 'от 6750 с.', coordinates: [40.73061, -73.935242], value: 25 },
    { id: 'marker4', city: 'San Francisco', price: 'от 6750 с.', coordinates: [37.773972, -122.431297], value: 35 },
    { id: 'marker5', city: 'Beijing', price: 'от 6750 с.', coordinates: [39.9042, 116.4074], value: 135 },
    { id: 'marker6', city: 'London', price: 'от 6750 с.', coordinates: [51.5074, 0.1278], value: 80 },
    { id: 'marker7', city: 'Los Angeles', price: 'от 6750 с.', coordinates: [29.7604, -95.3698], value: 54 },
  ];

  const options = {
    cameraRotateSpeed: 0.5,
    markerTooltipRenderer: marker => {
      const imageName = `/${marker.city.toLowerCase()}.png`;
      const tooltip = document.createElement('div');
      tooltip.innerHTML = `
        <div class="ticket-card">
          <img src="${imageName}" alt="${marker.city}">
          <div class="ticket-info">
            <h2>${marker.city}</h2>
            <p>Из Бишкека</p>
            <strong>${marker.price}</strong>
          </div>
          <button class="buy-button">Купить</button>
        </div>
      `;
      return tooltip;
    },
    markerRenderer: () => {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('/location.png');
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(0, 15, -13);
      sprite.scale.set(50, 50, 1);
      return sprite;
    },
  };

  const globeComponent = useMemo(() => (
    <ReactGlobe
      height="100vh"
      width="100vw"
      globeBackgroundTexture={null}
      initialCoordinates={[36.8969, 30.7133]}
      markers={markers}
      options={options}
      onMarkerClick={(marker) => {
        tippy(marker.element, {
          content: options.markerTooltipRenderer(marker),
          allowHTML: true,
          placement: 'top',
          interactive: true,
        }).show();
      }}
    />
  ), []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      {globeComponent}
    </div>
  );
}



// const options = {
//   cameraRotateSpeed: 0.5,
//   markerTooltipRenderer: marker => `${marker.city} (${marker.price})`,
//   markerRenderer: () => {
//     const textureLoader = new THREE.TextureLoader();
//     const texture = textureLoader.load('/location.png');
//     const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
//     const sprite = new THREE.Sprite(spriteMaterial);
//     sprite.position.set(0, 15, -13);
//     sprite.scale.set(50, 50, 1);
//     return sprite;
//   },
// };


// const handleMarkerClick = (marker) => {
//   setSelectedMarker(marker);


//   if (globe) {
//     const camera = globe.getCamera();
//     camera.zoomSpeed = 0;
//   }
// };

// const globeComponent = useMemo(() => (
//   <ReactGlobe
//     height="100vh"
//     width="50vw"
//     globeBackgroundTexture={null}
//     initialCoordinates={[36.8969, 30.7133]}
//     markers={markers}
//     options={options}
//     // onGetGlobe={setGlobe}
//     onClickMarker={handleMarkerClick}
//   />
// ), [globe]);


// return (
//   <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
//     {/* Левая часть с глобусом */}
//     <div style={{ flex: 1, height: '100vh', width: '50vw' }}>
//       {globeComponent}
//     </div>


//     {/* Правая часть с карточкой */}
//     <div className="card-container">
//       {selectedMarker && (
//         <div className="card">
//           <h1 className="title">
//             Отметьте свою следующую поездку на карте <span className="highlight">Airbook</span>!
//           </h1>
//           <div className="ticket-card">
//             <img src="/antalya.png" alt="Анталия" />
//             <div className="ticket-info">
//               <h2>{selectedMarker.city}</h2>
//               <p>{selectedMarker.from}</p>
//               <strong>{selectedMarker.price}</strong>
//             </div>
//             <button
//               className="buy-button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 alert(`Выбрана поездка в ${selectedMarker.city}`);
//               }}
//             >
//               Купить
//             </button>
//           </div>
//           <a href="#" className="view-tickets">
//             Посмотреть все билеты (39)
//           </a>
//         </div>
//       )}
//     </div>
//   </div>
// );

