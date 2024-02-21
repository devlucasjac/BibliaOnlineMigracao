import spinner from "../../../img/Spinner.gif";

function Loading() {
  return (
    <div style={{ margin: "0 auto" }}>
      <img src={spinner} alt="spinner"></img>
    </div>
  );
}

export default Loading;
