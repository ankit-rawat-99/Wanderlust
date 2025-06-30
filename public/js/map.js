const map = L.map('map').setView([28.6139, 77.2090], 10); // default: Delhi

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

L.marker([lat, lng])
  .addTo(map)
  .bindPopup('Listing Location')
  .openPopup();
