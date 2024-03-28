
import React, { useEffect, useState } from 'react';
import "./styles.css";

export default function DisplayCountries() {
    const [countryData, setCountryData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountryData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setCountryData([]);
        }
    }

    useEffect(() => {
        if (!searchText) {
            setSearchResult([]);
            return;
        }

        const result = countryData.filter(country =>
            country.name.common.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResult(result);
    }, [searchText, countryData]);

    function displayFinalResult() {
        const dataToDisplay = searchText ? searchResult : countryData;
        return dataToDisplay.map(country => (
            <div className="countryCard" key={country.ccn3}>
                <img src={country.flags.png} alt={country.flags.alt} width="100" height="100" />
                <h2>{country.name.common}</h2>
            </div>
        ));
    }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="container">
            <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                className="input"
                placeholder='Search for countries'
            />
            <div className="countryContainer">
                {displayFinalResult()}
            </div>
        </div>
    );
}