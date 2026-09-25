type DustProps = {
  children: string
  delay?: number
  spread?: number
}

export function Dust({ children, delay = 0, spread = 500 }: DustProps) {
  const words = children.split(" ")
  const total = Math.max(1, children.replace(/ /g, "").length - 1)
  let charIndex = 0

  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            <span className="whitespace-nowrap">
              {Array.from(word).map((char) => {
                const i = charIndex++
                return (
                  <span
                    key={i}
                    className="sand-char"
                    data-d={Math.round(delay + (i / total) * spread)}
                  >
                    {char}
                  </span>
                )
              })}
            </span>
            {w < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  )
}
