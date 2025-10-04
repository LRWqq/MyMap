// Copyright (C) 2025 Rong.
// This file is part of MultiSearch_MAP.
// under the terms of the GNU Affero General Public License as published by the Free
// Software Foundation, either version 3 of the License, or (at your option) any later version.

// MultiSearch_MAP is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
// or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
// for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.




const map = L.map('map').setView([-25.0, 135.0], 4); // Australia as default

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Layer group to hold search results
const resultLayer = L.layerGroup().addTo(map);

// Function to search and draw cities
async function searchCities(cities) {
  const loading = document.getElementById("loading");
  resultLayer.clearLayers();
  const notFoundCities = [];
  let bounds = null;
  
  try {
    loading.style.display = "block";

    const requests = cities.map(city => {
      // Clean up city name and properly encode it
      const cleanCity = city.replace(/[\/\\]/g, ' ').trim();
      const url = `https://nominatim.openstreetmap.org/search?` + 
                  `q=${encodeURIComponent(cleanCity)}` +
                  `&format=geojson` +
                  `&polygon_geojson=1` +
                  `&addressdetails=1` +
                  `&limit=1`;

      // Return a promise that won't reject on HTTP errors
      return fetch(url)
        .then(res => res.json())
        .then(data => ({ city: cleanCity, data }))
        .catch(err => {
          console.error(`Error fetching ${cleanCity}:`, err);
          return { city: cleanCity, data: { features: [] } };
        });
    });

    const results = await Promise.all(requests);

    results.forEach(result => {
      if (result.data.features && result.data.features.length > 0) {
        const feature = result.data.features[0];
        const geojson = L.geoJSON(feature, {
          style: { 
            color: 'blue', 
            weight: 2, 
            fillColor: 'blue',
            fillOpacity: 0.2 
          }
        }).addTo(resultLayer);

        geojson.bindPopup(result.city);
        
        // Extend bounds to include this result
        const geojsonBounds = geojson.getBounds();
        if (bounds === null) {
          bounds = geojsonBounds;
        } else {
          bounds.extend(geojsonBounds);
        }
      } else {
        notFoundCities.push(result.city);
      }
    });

    // Fit map to show all results
    if (bounds) {
      map.fitBounds(bounds);
    }

    // Show notification for unfound cities
    if (notFoundCities.length > 0) {
      alert(`No result found for ${notFoundCities.join(', ')}`);
    }

  } catch (err) {
    console.error("發生錯誤：", err);
    alert("查詢失敗，請稍後再試");
  } finally {
    loading.style.display = "none";
  }
}


// Hook up button
document.getElementById('searchBtn').addEventListener('click', () => {
  const input = document.getElementById('cityInput').value;
  const cities = input.split(/[,;|、，]+/).map(c => c.trim()).filter(c => c);
  if (cities.length > 0) {
    searchCities(cities);
  }
});
