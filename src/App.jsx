import { useState } from 'react'
import './App.css'
import Cell from './components/Cell'

function App() {
  // Initialize game state: empty board, X goes first, no error message, no winner yet, no winning line
  const [cells, setCells] = useState(Array(9).fill(''))
  const [turn, setTurn] = useState('X')
  const [moveError, setMoveError] = useState('')
  const [winner, setWinner] = useState(null)
  const [winningLine, setWinningLine] = useState([])

  // Check if current board state has a winning combination
  const checkWin = (board) => {
    // All possible winning combinations (rows, columns, diagonals)
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    // Check each winning combination
    for (let line of lines) {
      const [a, b, c] = line
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // Return winning line indices
        return line
      }
    }

    return null
  }

  // Check if the game is a tie (all cells filled)
  const checkTie = (board) => {
    return board.every(cell => cell !== '')
  }

  // Handle player moves
  const makeMove = (key) => {
    // Don't show error if game is over
    if (winner) {
      setMoveError('Game is over!!! Click Reset to play again')
      return
    }

    // Check if cell is already filled
    if (cells[key] !== '') {
      setMoveError('This spot is already taken!!!')
      return
    }

    // Clear any previous error message
    setMoveError('')

    // Create new board state with the player's mark
    const newCells = [...cells]
    newCells[key] = turn

    // Update game board with the new move
    setCells(newCells)

    // Check if the current move results in a win
    const winLine = checkWin(newCells)

    // Check for win or tie, otherwise switch turns
    if (winLine) {
      setWinner(turn)
      setWinningLine(winLine)
    }
    else if (checkTie(newCells)) {
      setWinner('Tie')
    }
    else {
      setTurn((turn === 'X') ? 'O' : 'X')
    }
  }

  // Reset the game to initial state
  const resetGame = () => {
    setCells(Array(9).fill(''))
    setTurn('X')
    setMoveError('')
    setWinner(null)
    setWinningLine([])
  }

  return (
    <>
      <div className="h-screen bg-sky-200 text-blue-700 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">Tic Tac Toe</h2>

        <div className="p-2 bg-sky-50 border-[0.2rem] border-blue-500 rounded-lg grid grid-cols-3 grid-rows-3 gap-2">
          {cells.map((cell, index) => (
            <Cell onClick={() => makeMove(index)} key={index} mark={cell} highlight={winningLine.includes(index)} />
          ))}
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3">
          <button onClick={resetGame} type="reset" className="px-3 py-1 bg-blue-500 hover:bg-green-500 rounded text-gray-100 cursor-pointer">Reset</button>

          <div className="px-8 py-3 bg-sky-50 border-2 border-blue-500 rounded-xl text-lg">
            {(moveError) ? (<span className="text-red-500">{moveError}</span>) :
              (winner === 'Tie') ? "It's a Tie!!!" :
                (winner) ? `${winner} Wins!!!` : `${turn}'s Turn`}
          </div>
        </div>
      </div>
    </>
  )
}

export default App