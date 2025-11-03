import { useState } from 'preact/hooks'

export const getClickMessage = (count: number): string => {
  const messages = [
    [0, '🫣 Click me… if you dare!'],
    [1, '😏 Oh wow, you actually clicked.'],
    [2, '🤔 Okay, maybe that was an accident?'],
    [3, '😳 You *really* meant it, huh?'],
    [5, '😅 That’s… quite a lot of clicking.'],
    [7, '🤨 Do you think something secret will happen?'],
    [10, '🕵️ Still clicking? Are you searching for the Easter egg?'],
    [15, '🧠 This button is starting to question your life choices.'],
    [20, '💪 Okay fine, I respect your commitment.'],
    [
      25,
      '🐇 Congrats! You’ve officially found the invisible Easter egg! (It’s invisible though 😜)',
    ],
    [30, '🪩 You win! 🎉 …Absolutely nothing!'],
    [50, '🫡 You’re either testing this or truly dedicated. Either way, I salute you.'],
    [100, '🚀 Achievement unlocked: Button Masher Supreme.'],
    [
      250,
      '🙃 You’ve wasted this much time clicking a stupid button. Don’t waste more — this is the end. Seriously.',
    ],
    [500, '😈 Okay… it was a lie. *This* is the end. The previous wasn’t. Probably.*'],
  ] as const

  const message = messages.toReversed().find(([threshold]) => count >= threshold)?.[1]

  return message ?? '🤷 Keep clicking, I guess?'
}

export const CounterDemo = () => {
  const [count, setCount] = useState(0)

  return (
    <button
      className="btn btn-lg btn-primary h-auto py-3"
      onClick={() => setCount((prev) => ++prev)}
    >
      {getClickMessage(count)}
    </button>
  )
}
