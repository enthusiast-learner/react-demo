import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";

function Board() {

    // const[ count, setCount]= useState(0);

    // const increment =()=>{
    //     setCount((prevcount) => prevcount+1)
    // }
    // const decrement = () => {
    //     setCount((prevCount) => prevCount - 1);
    //   };
    
    //   // Function to reset count
    //   const reset = () => {
    //     setCount(0);
    //   };

    //   useEffect (()=> {
    //     console.log("counter mounted");
    //   },[])

    //   useEffect(()=>{
    //     console.log("counter updated when counter updaated",count);

    //     return ()=>{
    //         console.log("counter uesEffect return",count );
    //     }
    //   },[count])



    //creates array of 9 having null values means empty
    const initialBoard = Array(9).fill(null);
    
    //squares → Stores the 3×3 board (null means an empty cell).
    const [squares, setSquares] = useState(initialBoard);

    //Tracks the next player (true = X, false = O).
    const [isNext, setNext] = useState(true);

    //winner → Stores the winning player ('X' or 'O').
    const [winner, setWinner] = useState(null);

    //isDraw → Becomes true if the board is full and there is no winner.
    const [isDraw, setIsDraw] = useState(false);


    useEffect(() => {
        const gameWinner = calculateWinner(squares);
        if (gameWinner) {
            setWinner(gameWinner);
            triggerConfetti();
        } else if (!squares.includes(null)) {
            setIsDraw(true);
        }
    }, [squares]);


    //function handles the player's move when they click on a square in the Tic-Tac-Toe grid.
    //i → Represents the index of the square the player clicked on.
    const handleSquares = (i) => {

    //     console.log("Clicked square index:", i);
    // console.log("Current board:", squares);
    // console.log("Winner:", winner);
        //If squares[i] is not null, means all are full so stop function using return.
        //If winner is not null, means someone won already so stop using return.
        if (squares[i] !== null || winner) {
            // console.log("Invalid move!");
            return};

        //React doesn't allow modifying state directly. Instead, we create a new array.
        //[...squares] → creates a shallow copy of squares array as newSquares.
        const newSquares = [...squares];

        //isNext is true initially
        //If isNext is true, it means Player X's turn, so we place "X".
        //If isNext is false, it means Player O's turn, so we place "O".
        newSquares[i] = isNext ? "X" : "O";

    //     console.log("Updated board:", newSquares);
    // console.log("Next turn:", isNext ? "O" : "X");

        //we are doing it on newSquares and then stores it into squares 
        //update the react state(squares)
        setSquares(newSquares);

        //This toggles isNext so the next player can play.
        // If it was true, it becomes false (O’s turn next).
        // If it was false, it becomes true (X’s turn next).
        setNext(!isNext);
    };

    //take squares as parameter
    const calculateWinner = (squares) => {
        //winning conditions
        const winningLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];


        //Loop through each winning combination (a, b, c are the indexes of a possible winning row/column/diagonal).
        for (let [a, b, c] of winningLines) {

            //squares[a] = check if its not null , if null stop execution
            //squares[a] === squares[b]  -> check if a and b are equal
            //squares[a] === squares[c]  -> check if a and c are equal
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]; // Return winner ('X' or 'O')
            }

        }
        return null; // No winner
    };

    const triggerConfetti = () => {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            emojis: ["🎉", "🏆"],
            emojiSize: 100,
            confettiNumber: 30,
        });
    };

    //resetting the game
    const resetGame = () => {
        //resetting the board as intial means empty array
        setSquares(initialBoard);
        //isNext determines whose turn it is.
        setNext(true);

        //clear the winner
        setWinner(null);
        //clear draw state 
        //isDraw is true when the game ends in a draw.
        //setting it to false
        setIsDraw(false);
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-7xl p-7 font-bold text-pink-500 
               animate-pulse drop-shadow-[0_0_8px_#ff00ff]">
    Tic Tac Toe
</h1>
        
            <div className="flex gap-8">
               
                {/* Tic-Tac-Toe Grid */}
                <div className="grid grid-cols-3 gap-2">
                    {squares.map((value, index) => (
                        <button
                            key={index}
                            className="w-24 h-24 bg-blue-500 text-white text-3xl font-bold 
                            flex items-center justify-center border-2 border-blue-300 
                            transition-all hover:bg-blue-600 
                            shadow-[0_0_10px_#00ffff] hover:shadow-[0_0_20px_#00ffff]"
                            onClick={() => handleSquares(index)}
                        >
                            {value}
                        </button>
                    ))}
                </div>

                {/* Right Side Panel */}
                <div className="flex flex-col items-center justify-center text-white rounded-lg shadow-lg p-4">
                    <h2 className="text-3xl font-bold">
                        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next Player: ${isNext ? "X" : "O"}`}
                    </h2>
                    {/* Reset Button */}
            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 
                shadow-[0_0_10px_red] hover:shadow-[0_0_20px_red]"
                onClick={resetGame}
            >
                Reset Game
            </button>
            {/* <h1 className="text-2xl font-bold">Counter: {count}</h1>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 
                shadow-[0_0_10px_red] hover:shadow-[0_0_20px_red" onClick={increment}>Increment</button>
                   
                    <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 
                shadow-[0_0_10px_red] hover:shadow-[0_0_20px_red" onClick={decrement}>decrement</button>
   
    <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800 
                shadow-[0_0_10px_red] hover:shadow-[0_0_20px_red" onClick={reset}>reset count</button> */}
                </div>
               
            </div>

            

            {/* Modal for Draw */}
            {isDraw && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-3xl font-bold text-gray-800">It's a Draw! 🤝</h2>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            onClick={resetGame}
                        >
                            Play Again
                        </button>

                       
                    </div>
                </div>
            )}
        </div>
    );
}

export default Board;
