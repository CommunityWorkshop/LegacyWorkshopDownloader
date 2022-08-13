import Button from "../Button";

interface Props {
  itemURL: string;
  onChange: (itemURL: string) => void;
  handleDownload: () => void;
}

const DownloadBar = ({ itemURL, onChange, handleDownload }: Props) => {
  // * States

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div
        className="flex flex-row group border-t-2 border-white border-opacity-10 bg-white bg-opacity-5 max-w-xl w-full
    text-white focus:shadow-lg transition-all rounded-full gap-2 items-center justify-center mt-5"
      >
        <input
          value={itemURL}
          onChange={(e) => onChange(e.target.value)}
          className="outline-none text-sm font-mono bg-white bg-opacity-0 w-full
            text-white transition-all rounded-full px-6 py-2"
          placeholder="Workshop item URL"
        />
      </div>
      <Button
        primary
        className="mt-5 px-4"
        text={"Download"}
        onClick={handleDownload}
      />
    </div>
  );
};

export default DownloadBar;
