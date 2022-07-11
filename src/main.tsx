import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";

const Main = () => {
  return (
    <RecoilRoot>
      <HashRouter>
        <Toaster toastOptions={{ className: "bg-primary-light text-white" }} />
        <App />
      </HashRouter>
    </RecoilRoot>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);

window.removeLoading();
