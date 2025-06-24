import { initTelegram } from "@/entities/telegram";
import { AppRouterProvider } from "./providers/router-provider/ui/app-router-provider";
import "./styles/index.css";
import ReactModal from "react-modal";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

initTelegram();

function App() {
  console.log(retrieveLaunchParams());

  return <AppRouterProvider />;
}

export default App;

ReactModal.setAppElement("#root");
