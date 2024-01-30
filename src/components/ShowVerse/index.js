function ShowVerse({ verse }) {
  return (
    <div>
      <span>{verse.number}</span>
      <p>{verse.text}</p>
    </div>
  );
}

export default ShowVerse;
