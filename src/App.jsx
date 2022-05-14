import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import image from "./img/undraw_doctors_hwty.svg";
import { Cards, CountryPicker, Charts } from "./components";

import { fetchData } from "./api";

const App = () => {
  const [data, setData] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    const load = async () => {
      const data = await fetchData();
      setData(data);
    };
    load();
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    setData(data);
    setCountry(country);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      {data && (
        <>
          <Cards dataCards={data} />
          <CountryPicker handleCountryChange={handleCountryChange} />
          <Charts data={data} country={country} />
        </>
      )}
    </div>
  );
};

export default App;
