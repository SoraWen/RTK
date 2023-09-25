import React, { useState } from "react";

function Fortest() {
  const [n, setN] = useState(0);
  const [randomNumber, setRandomNumber] = useState([]);

  const handleRandom = () => {
    if (n < 6) {
      alert("請輸入數字6以上");
      return;
    }
    const number = Array.from({ length: n }, (_, i) => i + 1);
    const shuffled = number.sort(() => 0.5 - Math.random());
    setRandomNumber(shuffled.slice(0, 6));
  };

  return (
    <div>
      <input
        type="number"
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        placeholder="輸入數字"
      />
      <button onClick={handleRandom} className=" bg-sky-600">
        Random 6
      </button>
      <div className=" space-x-2">
        {randomNumber.map((num) => (
          <span className="">{num}</span>
        ))}
      </div>
    </div>
  );
}

export default Fortest;
