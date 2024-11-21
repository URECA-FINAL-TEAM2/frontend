import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="rounded bg-blue-500 px-4 py-2 font-bold text-white shadow hover:bg-blue-700">버튼</div>
      <div className="rounded bg-blue-500 px-4 py-2 font-bold text-white shadow hover:bg-blue-700">버튼</div>

      <div className="rounded bg-blue-500 px-4">안녕</div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <div className="flex text-3xl font-bold">안녕</div>
        <p>
          Edit <code>src/App.jsx</code>
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
