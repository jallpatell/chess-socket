import { useState } from 'react';

import Board from "./pages/Board.jsx";
import './App.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Board />
    </>
  )
}

export default App
