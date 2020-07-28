import React from 'react';

const CountryDetails = ({countryDetails}) => {
  if (countryDetails === null) {
    return []
  }

  return (
    <div>
      <h2>{countryDetails.name}</h2>
      capital {countryDetails.capital} <br />
      population {countryDetails.population} <br />
      <h3>languages</h3>
      <ul>
        {countryDetails.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img width="150" src={countryDetails.flag} alt="flag" />
    </div>
  )
}

export default CountryDetails;
