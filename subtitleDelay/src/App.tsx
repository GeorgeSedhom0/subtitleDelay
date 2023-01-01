import { useState, useEffect } from "react";
import "./App.css";
import DelayAndDownload from "./componants/delayAndDownload";

const App = () => {
  const [delay, setDelay] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      if (file.name.split(".").pop() !== "srt") {
        alert("Please select a valid .srt file");
        setFile(null);
      }
    }
  }, [file]);

  return (
    <div className="App">
      <h1>Hello, this app will allow you to delay subtitles in a video.</h1>

      <label htmlFor="file">
        CLICK AND SELECT FILE OR YOU CAN USE DEAG AND DROP
      </label>
      <br />
      <input
        id="file"
        type="file"
        accept=".srt"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        style={{
          border: "1px solid grey",
          borderRadius: "5px",
          padding: "5px",
          cursor: "pointer",
        }}
      />
      <br />
      <br />
      <input
        type="number"
        value={delay}
        onChange={(e) => {
          setDelay(parseInt(e.target.value));
        }}
      />

      <DelayAndDownload delay={delay} file={file} />
    </div>
  );
};

export default App;
