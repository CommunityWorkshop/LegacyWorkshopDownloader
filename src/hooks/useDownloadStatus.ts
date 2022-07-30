import axios from "axios/dist/axios";
import { useEffect, useState } from "react";

const useDownloadStatus = (isDownloading: boolean) => {
  // * States
  const [downloadStatus, setDownloadStatus] = useState("Downloading...");

  // * Effects
  useEffect(() => {
    let interval: any = null;
    if (isDownloading) {
      interval = setInterval(() => {
        getDownloadStatus();
      }, 500);
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [isDownloading]);

  // * Functions
  const getDownloadStatus = async () => {
    try {
      const status = await axios.get("http://localhost:2550/status");
      console.log(status.data);
      setDownloadStatus(status.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return downloadStatus;
};

export default useDownloadStatus;
