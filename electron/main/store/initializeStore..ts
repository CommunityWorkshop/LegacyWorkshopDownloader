import downloadsFolder from "downloads-folder";
import store from ".";

export const initializeStore = () => {
  store.get("downloadLocation") ||
    store.set("downloadLocation", downloadsFolder());
  store.get("autoExtractEnabled") || store.set("autoExtractEnabled", false);
};
