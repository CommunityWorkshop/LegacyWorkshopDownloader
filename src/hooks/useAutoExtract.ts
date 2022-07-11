import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";

const useAutoExtract = () => {
  // * States
  const [autoExtractEnabled, setAutoExtractEnabled] = useState(false);

  // * Effects
  useEffect(() => {
    getIsAutoExtractEnabled();
  }, []);

  // * Functions
  const getIsAutoExtractEnabled = async () => {
    const autoExtractEnabledLocal = await ipcRenderer.invoke(
      "getIsAutoExtractEnabled"
    );
    setAutoExtractEnabled(autoExtractEnabledLocal);
  };

  const changeAutoExtract = async (value: boolean) => {
    await ipcRenderer.invoke("changeAutoExtract", value);
    setAutoExtractEnabled(value);
  };

  return { autoExtractEnabled, changeAutoExtract };
};

export default useAutoExtract;
