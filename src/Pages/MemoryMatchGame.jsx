import React, { useEffect, useState } from "react";

const emojis = ["🍎", "🚀", "🎈", "🐶", "🍕", "🎮"];
const shuffledCards = [...emojis, ...emojis]
  .sort(() => Math.random() - 0.5)
  .map((emoji, index) => ({
    id: index,
    emoji,
    flipped: false,
    matched: false,
  }));

const MemoryMatchGame = () => {
  const [cards, setCards] = useState(shuffledCards);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.emoji === second.emoji) {
        setCards(prev =>
          prev.map(card =>
            card.emoji === first.emoji ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => {
        setCards(prev =>
          prev.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, flipped: false }
              : card
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  const handleClick = (card) => {
    if (card.flipped || card.matched || flippedCards.length === 2) return;

    const updatedCard = { ...card, flipped: true };
    setCards(prev =>
      prev.map(c => (c.id === card.id ? updatedCard : c))
    );
    setFlippedCards(prev => [...prev, updatedCard]);
  };

  const resetGame = () => {
    const reshuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(reshuffled);
    setFlippedCards([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Memory Match Game 🧠</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.id}
            className={`w-20 h-24 flex items-center justify-center text-2xl font-bold rounded-xl cursor-pointer transition-transform duration-300 transform ${
              card.flipped || card.matched
                ? "bg-white"
                : "bg-blue-500 hover:bg-blue-400"
            } ${card.flipped ? "rotate-y-180" : ""}`}
            onClick={() => handleClick(card)}
          >
            {card.flipped || card.matched ? card.emoji : "❓"}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔄 Reset
      </button>
    </div>
  );
};

export default MemoryMatchGame;
