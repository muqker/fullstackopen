import React from 'react';

const ListCountries = ({countries, setCountryDetails}) => {
  if (countries.length === 1) {
    return []
  }
  if (countries.length > 10) {
    return <div> Too many matches, specify another filter </div>
  }

  const handleShow = (country) => {
    setCountryDetails(country)
  }
  
  return (
    <div>
      {countries.map(country => 
        <div key={country.name}>
          {country.name}
          <button onClick={() => handleShow(country)}>show</button>
        </div>
      )}
    </div>
  )
}

export default ListCountries;
