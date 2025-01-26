function HighLightText({ text, pattern }: { text: string; pattern: string }) {
  const patternReplace = pattern?.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')

  const textArray = text.split(RegExp(patternReplace.trim(), 'ig'))
  const match = text.match(RegExp(patternReplace.trim(), 'ig'))
  return (
    <span>
      {textArray.map((item, index) => (
        <>
          {item}
          {index !== textArray.length - 1 && match && (
            <span className=' bg-yellow-200' key={`highlight-text-${index + 1}`}>
              {match[index]}
            </span>
          )}
        </>
      ))}
    </span>
  )
}

export default HighLightText
