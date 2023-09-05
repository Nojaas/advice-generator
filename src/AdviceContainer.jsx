import IconDice from "./assets/icon-dice.svg";
import DividerDesktop from "./assets/divider-desktop.svg";

import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [advice, setAdvice] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      return; 
    }

    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((result) => {
        setAdvice(result.slip.advice);
        setId(result.slip.id);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [loading]); 

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <>
      <div className="container">
        <p className="advice-title">Advice #{id}</p>
        {loading ? (
          <p className="advice-description">Loading...</p>
        ) : advice ? (
          <p className="advice-description">"{advice}"</p>
        ) : (
          <p className="advice-description">No advice available</p>
        )}

        <img className="separator" src={DividerDesktop} alt="" />

        <button className="generate-advice" onClick={handleClick}>
          <img src={IconDice} alt="" />
        </button>
      </div>
    </>
  );
}

export default App;
