import { initTelegram } from "@/entities/telegram";
import { AppRouterProvider } from "./providers/router-provider/ui/app-router-provider";
import "./styles/index.css";
import ReactModal from "react-modal";
import { useEffect } from "react";
import { ApolloProvider } from "./providers/apolo-provider";
import { TonConnectProvider } from "@/entities/ton";
import { ProfileUserProvider } from "@/features/profile-user-provider";
import { ToastProvider } from "./providers/toast-provider";

function App() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <TonConnectProvider>
      <ApolloProvider>
        <ProfileUserProvider>
          <AppRouterProvider />
          <ToastProvider />
        </ProfileUserProvider>
      </ApolloProvider>
    </TonConnectProvider>
  );
}

export default App;

ReactModal.setAppElement("#root");
