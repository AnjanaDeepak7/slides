import React, { useEffect, useState } from "react";
import data from "./components/data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index > lastIndex) {
      setIndex(0);
    }
    if (index < 0) {
      setIndex(lastIndex);
    }
  }, [index, people]);
  useEffect(() => {
    let slider = setTimeout(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  });
  return (
    <section className="main-container">
      <h2>
        <span>/</span>Reviews
      </h2>
      <div className="section-container">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article key={id} className={position}>
              <img src={image} alt={name} />
              <h4 className="name">{name}</h4>
              <p className="title">{title}</p>
              <p className="quote">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <FiChevronLeft className="prev" onClick={() => setIndex(index - 1)} />
        <FiChevronRight className="next" onClick={() => setIndex(index + 1)} />
      </div>
    </section>
  );
}

export default App;
