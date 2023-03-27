import "./style.css"
import {useState} from "react";

function Square({value, onhandleClick}) {
    //const [value,setValue] = useState(null)
    //const [click, setClick] = useState(false)

    return (
        <button onClick={onhandleClick} className="square">{value}</button>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Board({XIsNext, squares, onPlay}) {
    //const [squares, setSquares] = useState(Array(9).fill(null))

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {//防止重复点击
            return
        }
        const nextSquares = squares.slice()//复制
        if (XIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        //setSquares(nextSquares)
        //setXIsNext(!XIsNext)
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares)
    let status
    if (winner) {
        status = "winner:" + winner
    } else {
        status = "Now:" + (XIsNext ? "X" : "O")
    }
    return (
        <>
            <div>
                {status}
            </div>
            <div className="board-row">
                <Square value={squares[0]} onhandleClick={() => handleClick(0)}/>
                <Square value={squares[1]} onhandleClick={() => handleClick(1)}/>
                <Square value={squares[2]} onhandleClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onhandleClick={() => handleClick(3)}/>
                <Square value={squares[4]} onhandleClick={() => handleClick(4)}/>
                <Square value={squares[5]} onhandleClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onhandleClick={() => handleClick(6)}/>
                <Square value={squares[7]} onhandleClick={() => handleClick(7)}/>
                <Square value={squares[8]} onhandleClick={() => handleClick(8)}/>
            </div>
        </>
    )
}

export default function Game() {
    const [XIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares) {
        //setHistory([...history,nextSquares])//顺序写入
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        setXIsNext(!XIsNext)
    }

    function jumpTo(nextMove) {

        setCurrentMove(nextMove)
        console.log("nextMove % 2 === 0", nextMove % 2 === 0)
        setXIsNext(nextMove % 2 === 0)
    }

    const moves = history.map((squares, move) => {
        let description
        if (move > 0) {
            description = "Go to move #" + move
        } else {
            description = "Go to start"
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })
    return (
        <div className="game">
            <div className="game-board">
                <Board XIsNext={XIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}