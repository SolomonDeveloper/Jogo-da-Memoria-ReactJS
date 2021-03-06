import React, { useEffect, useState } from 'react'
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver'
import game from './game/game';

export default function MemoryGame() {

    const [cards, setCards] = useState([])

    useEffect(() => {
        setCards(game.createCardsFromTechs());
    }, [])

    const [gameOver, setGameOver] = useState(false);

    function restart() {
        game.clearCards();
        setCards(game.createCardsFromTechs())
        setGameOver(false);
    }

    function handleFlip(card) {
        if (game.setCard(card.id)) {
            if (game.secondCard) {
                if (game.checkMatch()) {
                    game.clearCards();
                    if (game.checkGameOver()) {
                       setGameOver(true);
                    }
                } else {
                    setTimeout(() => {
                        game.unflipCards();
                        setCards([...game.cards]);
                    }, 1000);

                };
            }
        }

        setCards([...game.cards]);
    }

    return (
        <div>
            <GameBoard handleFlip={handleFlip} cards={cards} />
            Jogo da memória
            <GameOver show={gameOver} handleRestart={restart} />
        </div>
    )
}
