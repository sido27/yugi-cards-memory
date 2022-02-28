import "./Card.css";
export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {

    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={card.src}
          alt="card front"
          aria-label="card front"
        />
        <img
          onClick={handleClick}
          className="back serv"
          src="/yugi/back.png"
          alt="card back"
          aria-label="card back"
        />
      </div>
    </div>
  );
}
