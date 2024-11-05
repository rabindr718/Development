import React from "react";
import styles from "./Home.module.css";
import ProductList from "./components/ProductList";
function Home() {
  return (
    <div height="100px" className={styles.home}>
      <img
        className={styles.image}
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
      />
      <ProductList />
    </div>
  );
}

export default Home;
