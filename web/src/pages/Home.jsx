import { useState } from 'react'


export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-red-500">Get started</h1>
      </div>
      <button
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>
    </>
  )
}