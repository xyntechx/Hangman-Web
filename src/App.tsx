import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const WORD: string = import.meta.env.VITE_WORD; // load word from .env.local
    const LETTERS = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];

    const [hiddenWord, setHiddenWord] = useState<string[]>([]);
    const [chosenLetters, setChosenLetters] = useState<string[]>([]);
    const [livesLeft, setLivesLeft] = useState(7); // standard hangman rules (if there even is any :p)
    const [isGameOver, setIsGameOver] = useState(false); // true when livesLeft === 0

    const [color, setColor] = useState<"#66d966" | "#d96666" | "#213547">(
        "#213547"
    ); // feedback to user

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

    const checkLetter = (letter: string) => {
        setChosenLetters((chosenLetters) => [...chosenLetters, letter]);

        if (WORD.includes(letter)) {
            const indices: number[] = [];

            for (let i = 0; i < WORD.length; i++) {
                const char = WORD[i];
                if (char === letter) indices.push(i);
            }

            const newHidden = hiddenWord.map((char, i) => {
                if (indices.includes(i))
                    return letter; // change blank to letter
                else return char; // retain blank
            });

            setHiddenWord(newHidden);
            setColor("#66d966"); // green
        } else {
            setLivesLeft((livesLeft) => livesLeft - 1);
            setColor("#d96666"); // red
        }
    };

    return (
        <main className="main">
            <h1 style={{ color: color }}>Hangman</h1>
            <p>Lives left: {livesLeft}</p>
            {!isGameOver && hiddenWord.includes("__") ? (
                <p>
                    {hiddenWord.map((char, i) => (
                        <span key={i} className="blanks">
                            {char}
                        </span>
                    ))}
                </p>
            ) : (
                <p className="blanks">{WORD}</p>
            )}
            <div className="letters">
                {LETTERS.map((letter) => (
                    <button
                        onClick={(e) => checkLetter(e.currentTarget.value)}
                        value={letter}
                        key={letter}
                        disabled={
                            chosenLetters.includes(letter) ||
                            livesLeft <= 0 ||
                            !hiddenWord.includes("__")
                        }
                        className="button"
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </main>
    );
}

export default App;
