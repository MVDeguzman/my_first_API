import React, { useState } from 'react';
import './App.css';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCountry = async () => {
    if (!countryName) return;
    
    setLoading(true);
    setError(null);
    setCountryData(null);

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      
      if (!response.ok) {
        throw new Error('Country not found. Pakicheck ang spelling!');
      }

      const data = await response.json();
      // Ang API ay nagbabalik ng array, kaya kukunin natin ang index [0]
      setCountryData(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🌍 Country Info Finder</h1>
      
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Enter country name (e.g. Philippines)" 
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          style={{ padding: '10px', width: '250px' }}
        />
        <button onClick={fetchCountry} style={{ padding: '10px', marginLeft: '5px', cursor: 'pointer' }}>
          Search
        </button>
      </div>

      <hr />

      {loading && <p>Searching... 🔍</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {countryData && (
        <div className="result-card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', display: 'inline-block', marginTop: '20px' }}>
          <h2>{countryData.name.common}</h2>
          <img 
            src={countryData.flags.png} 
            alt={`Flag of ${countryData.name.common}`} 
            style={{ width: '200px', borderRadius: '5px' }} 
          />
          <p><strong>Capital:</strong> {countryData.capital ? countryData.capital[0] : 'N/A'}</p>
          <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;