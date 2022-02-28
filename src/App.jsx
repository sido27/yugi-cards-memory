import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import IMAGES from "./images.json";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffle = (arr) => {
    const shuffled = arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  const SHUFFLE_CARDS = () => {
    const SHUFFLED_CARDS = [...IMAGES, ...IMAGES];

    const SHUFFLED_CARDS2 = shuffle(SHUFFLED_CARDS).map((card) => ({
      ...card,
      id: Math.random(),
    }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(SHUFFLED_CARDS2);
    setTurns(0);
  };

  const handleChoice = (card) => {

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };


  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {

            if (card.src === choiceOne.src) {
              return {
                ...card,
                matched: true,
              };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // Wait 500ms before the card flips again
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);



  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };


  useEffect(() => {
    SHUFFLE_CARDS();
  }, []);

  return (
    <div className="App">
      <header>
        <div className="w-100">
          <h1>Memory</h1>
          <var>Turns: {turns}</var>
        </div>
        <button onClick={SHUFFLE_CARDS} className="btn btn-danger">New Game</button>
      </header>

      <div className="grid" id="cardGrid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}

            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
