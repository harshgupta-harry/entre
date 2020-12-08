function indexOfNth(string, char, nth, fromIndex = 0) {
  const indexChar = string.indexOf(char, fromIndex);
  if (indexChar === -1) {
    return -1;
  } if (nth === 1) {
    return indexChar;
  }
  return indexOfNth(string, char, nth - 1, indexChar + 1);
}

export default function trimText(text, chars = 500, nl = 9) {
  const lastSpace = text.lastIndexOf(' ', chars);
  const nlIndex = indexOfNth(text, '\n', nl);
  const lenIndex = text.length <= chars ? text.length : lastSpace;
  const trimIndex = nlIndex !== -1 ? Math.min(nlIndex, lenIndex) : lenIndex;
  return (
    <>
      {text.substr(0, trimIndex)}
      {text.length > trimIndex && '...'}
    </>
  );
}
