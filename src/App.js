import styles from "./App.module.css";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const responseData = await response.json();
        setData(responseData);
        setSearchResults(responseData);
      } catch (error) {
        console.error("Error caught:", error);
      }
    };

    getCountries();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredCountries = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredCountries);
  };



  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className={styles.container}>
        {searchResults.map((country) => (
          <div key={country.name.common} className={styles.countryCard}>
            <img
              className={styles.image}
              src={country.flags.png}
              alt={country.name.common}
            />
            <h2>{country.name.common}</h2>
            
          </div>
        ))}
      </div>
    </div>
  );
}
