import axios from "axios/dist/axios";
import { useEffect, useState } from "react";

const useDownloadStatus = (isDownloading: boolean) => {
  // * States
  const [downloadStatus, setDownloadStatus] = useState("Downloading...");
  const [downloadingMethod, setDownloadingMethod] = useState<"DD" | "GGNTW">();

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
      const { data: statusData } = await axios.get(
        "http://localhost:2550/status"
      );
      console.log(statusData);
      statusData.method && setDownloadingMethod(statusData.method);
      setDownloadStatus(statusData.status);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { status: downloadStatus, method: downloadingMethod };
};

export default useDownloadStatus;
