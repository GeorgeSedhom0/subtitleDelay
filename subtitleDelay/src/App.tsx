import { useState } from "react";
import "./App.css";
import DelayAndDownload from "./componants/delayAndDownload";

function App() {
  const [delay, setDelay] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="App">
      <h1>Hello, this app will allow you to delay subtitles in a video.</h1>
      <input
        type="file"
        accept=".srt"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
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
}

export default App;
