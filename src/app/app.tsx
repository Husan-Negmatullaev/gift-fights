import { initTelegram } from "@/entities/telegram";
import { TonConnectProvider } from "@/entities/ton";
import { LobbyProvider } from "@/features/lobby";
import { ProfileUserProvider } from "@/features/profile-user-provider";
import { NavigationProvider } from "@/shared/contexts/navigation-context";
import { extend } from "@pixi/react";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { useEffect } from "react";
import ReactModal from "react-modal";
import { ApolloProvider } from "./providers/apolo-provider";
import { AppRouterProvider } from "./providers/router-provider/ui/app-router-provider";
import { ToastProvider } from "./providers/toast-provider";
import "./styles/index.css";

extend({ Container, Graphics, Text, Sprite });

function App() {
	useEffect(() => {
		initTelegram();
	}, []);

	return (
		<TonConnectProvider>
			<ApolloProvider>
				<ProfileUserProvider>
					<LobbyProvider>
						<NavigationProvider>
							<AppRouterProvider />
							<ToastProvider />
						</NavigationProvider>
					</LobbyProvider>
				</ProfileUserProvider>
			</ApolloProvider>
		</TonConnectProvider>
	);
}

export default App;

ReactModal.setAppElement("#root");
