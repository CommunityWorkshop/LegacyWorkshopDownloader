import getItemIdFromURL from "@/utils/getItemIdFromUrl";
import { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  // * States
  const [itemURL, setItemURL] = useState("");
  const [loading, setLoading] = useState(false);

  // * Hooks

  // * Functions
  const handleDownload = async () => {
    setLoading(true);
    if (itemURL) {
      const id = getItemIdFromURL(itemURL);
      if (id) {
        try {
          const res = await fetch(`http://localhost:2550/download/${id}`);
          console.log(res.ok);
          if (res.ok) {
            console.log(res);
            toast.success("File downloaded successfully");
          } else {
            toast.error("Something went wrong!");
          }
        } catch (error) {
          toast.error("Error!");
        }
      }
    } else {
      toast.error("Please enter a valid URL!");
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 flex items-center flex-col justify-center">
      {loading && (
        <div className="absolute w-screen top-0 z-50 text-white h-screen shadow-lg backdrop-blur-3xl items-center justify-center flex">
          <div className="flex flex-row items-center justify-center">
            <svg
              role="status"
              className="w-8 h-8 mr-2 text-primary-light animate-spin dark:text-gray-600 fill-indigo-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <h3 className="ml-2"> Downloading...</h3>
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 w-full">
        <div className="flex-1 pb-10   flex flex-col items-center justify-center">
          <div className="font-medium mb-2 text-white text-3xl">
            Enter your workshop item url
          </div>
          <input
            value={itemURL}
            onChange={(e) => setItemURL(e.target.value)}
            className="outline-none bg-white bg-opacity-10 max-w-xl w-full mt-5 text-white focus:shadow-lg transition-all rounded-full px-6 py-2"
            placeholder="URL"
          />
          <button
            onClick={handleDownload}
            className="mt-8 font px-4 transition-all bg-primary-light  hover:bg-indigo-700 text-white rounded-md py-2"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
