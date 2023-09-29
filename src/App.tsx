import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const WORD = import.meta.env.VITE_WORD; // load word from .env.local
    const [hiddenWord, setHiddenWord] = useState<string[]>([]);
    const [livesLeft, setLivesLeft] = useState(7); // standard hangman rules (if there even is any :p)
    const [isGameOver, setIsGameOver] = useState(false); // true when livesLeft === 0

    useEffect(() => {
        const blanks: string[] = [];

        for (let i = 0; i < WORD.length; i++) {
            const char = WORD[i];
            if (char === " ") blanks.push(" ");
            else blanks.push("__");
        }

        setHiddenWord(blanks);
    }, []);

    useEffect(() => {
        if (livesLeft === 0) setIsGameOver(true);
    }, [livesLeft]);

    return (
        <main className="main">
            <h1>Hangman</h1>
            <p>Lives left: {livesLeft}</p>
            <p>
                {hiddenWord.map((char) => (
                    <span className="blanks">{char}</span>
                ))}
            </p>
        </main>
    );
}

export default App;
