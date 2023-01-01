import delaySubs from "../delay";

const DelayAndDownload: React.FC<{ delay: number; file: File | null }> = ({
  delay,
  file,
}) => {
  return (
    <div>
      <h6>Delay: {delay}</h6>
      <h6>File: {file?.name}</h6>

      <button
        onClick={async () => {
          const oldFileString = await file?.text();
          if (!oldFileString) {
            return;
          }
          const newFileString = delaySubs(oldFileString, delay);
          console.log(newFileString);
          const fileToDownload = new Blob([newFileString], {
            type: "text/plain",
          });
          const a = document.createElement("a");
          const url = URL.createObjectURL(fileToDownload);
          // download the file
          a.setAttribute(
            "download",
            `${file?.name?.split(".")[0]}_delayed_${delay}.srt`
          );
          a.setAttribute("href", `${url}`);
          a.click();
          a.remove();
        }}
      >
        Delay and Download
      </button>
      <h4>YAfter clicking the button, the new file will be downloaded</h4>
    </div>
  );
};

export default DelayAndDownload;
