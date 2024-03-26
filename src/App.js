import styles from "./App.module.css";
import { useState, useEffect } from "react";


export default function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");


  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const responseData = await response.json();
        setData(responseData);
      } catch (e) {
        console.log("Error caught");
      }
    };

    getCountries();
  }, []);

  useEffect(()=>{
      setData(data.filter((ele)=>(ele.name.common).includes(country))
    )
  },[country])

  const handleChange = (e) => {
    setCountry(e.target.value)
  }

  return (
    <>
      <input placeholder="Search a country" onChange={handleChange} value={country} type="text"/>

      <div className={styles.container}>
        {data.map((country) => {
          return (
            <div key={country.name.common} className={styles.countryCard}>
              <img
                className={styles.image}
                src={country.flags.png}
                alt={country.name.common}
              />

              <p className="{styles.countryName}">{country.name.common}</p>
            </div>
          );
        })}
      </div>

    </>
  );
}
