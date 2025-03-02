import { useState } from 'react';
import { MapPin } from 'lucide-react';

function HospitalLocator() {
  const [location, setLocation] = useState('');
  const [mapSrc, setMapSrc] = useState('https://maps.google.com/maps?q=nearby+hospitals&t=&z=13&ie=UTF8&iwloc=&output=embed');
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location) {
      const encodedLocation = encodeURIComponent(location);
      setMapSrc(`https://maps.google.com/maps?q=${encodedLocation}+hospitals&t=&z=13&ie=UTF8&iwloc=&output=embed`);
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: '#e6f7e6',
      borderRadius: '16px',
      boxShadow: isHovered ? '0px 8px 20px rgba(0, 0, 0, 0.2)' : '0px 4px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '2rem auto',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      color: '#2c7a2c',
      marginBottom: '1rem',
    },
    map: {
      width: '100%',
      height: '300px',
      borderRadius: '12px',
      border: 'none',
      transition: 'transform 0.3s',
    },
    searchForm: {
      marginBottom: '1.3rem',
      
    },
    input: {
      padding: '0.5rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      width: '80%',
      marginRight: '0.5rem',
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#2c7a2c',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div 
      style={styles.container} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 style={styles.title}>
        <MapPin size={24} /> Nearest Hospital and Lab Locator
      </h2>
      <form style={styles.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>
      <iframe
        src={mapSrc}
        style={styles.map}
        title="Hospital Locator"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default HospitalLocator;