import { useState } from 'react'
import './App.css'
import Cell from './components/Cell'

function App() {
  const [cells, setCells] = useState(Array(9).fill(''));

  return (
    <>
      <div className="h-screen bg-sky-200 text-blue-700 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">Tic Tac Toe</h2>

        <div className="p-2 bg-sky-50 border-[0.2rem] border-blue-500 rounded-lg grid grid-cols-3 grid-rows-3 gap-2">
          {cells.map((_, index) => (
            <Cell key={index} />
          ))}
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3">
          <button type="reset" className="px-3 py-1 bg-blue-500 hover:bg-green-500 rounded text-gray-100 cursor-pointer">Reset</button>

          <div className="px-8 py-3 bg-sky-50 border-2 border-blue-500 rounded-xl text-lg">Play</div>
        </div>
      </div>
    </>
  )
}

export default App