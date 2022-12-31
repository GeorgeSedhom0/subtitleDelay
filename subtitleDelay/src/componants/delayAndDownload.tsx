import delaySubs from "../delay";

const delayAndDownload: React.FC<{ delay: number; file: File | null }> = ({
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
        }}
      >
        Delay and Download
      </button>
      <h4>
        You can see the results on the console soon will be able to download the
        file
      </h4>
    </div>
  );
};

export default delayAndDownload;
