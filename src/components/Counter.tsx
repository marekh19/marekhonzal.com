import { useState } from 'preact/hooks'

export const Counter = () => {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prev) => ++prev)
  }

  return (
    <button
      className="btn btn-primary"
      onClick={handleIncrement}
    >
      Count: {count}
    </button>
  )
}
