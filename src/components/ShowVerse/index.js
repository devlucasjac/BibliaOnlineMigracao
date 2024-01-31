function ShowVerse({ verse }) {
  return (
    <div>
      <span>{verse.verse}</span>
      <p>{verse.text}</p>
    </div>
  );
}

export default ShowVerse;
