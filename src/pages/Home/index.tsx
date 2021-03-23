import React from "react";
//styles
import { HomeComponent, Posts, Info } from "./HomeStyles";
//store
import useStore from "../../store";
import Header from "../../components/Header";
const Home = () => {
  const store = useStore();
  React.useEffect(() => {
    store.fetchSubaminsDesc();
    // store.fetchSubaminByIds([1, 2, 3]);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  console.log(store.subaminsDesc);
  return (
    <HomeComponent darkMode={store.darkMode}>
      <Posts darkMode={store.darkMode}>
        <Header />
      </Posts>
      <Info darkMode={store.darkMode}>
        <div className="trending">
          <h2>Most popular subaminas</h2>
          {store.subaminsDesc.map((subamin, index) => (
            <div className="subamina">
              <span>{index + 1}</span>
              <img src={subamin.logo} alt={subamin.name} className="logo" />
              <span>{subamin.name}</span>
            </div>
          ))}
        </div>
      </Info>
    </HomeComponent>
  );
};

export default Home;
