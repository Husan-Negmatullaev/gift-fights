import { createContext, useContext, useState, type ReactNode } from "react";

interface NavigationContextType {
	isNavBarVisible: boolean;
	hideNavBar: () => void;
	showNavBar: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
	isNavBarVisible: true,
	hideNavBar: () => {},
	showNavBar: () => {},
});

export const useNavigationContext = () => {
	const context = useContext(NavigationContext);
	if (!context) {
		throw new Error(
			"useNavigationContext must be used within NavigationProvider",
		);
	}
	return context;
};

interface NavigationProviderProps {
	children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
	const [isNavBarVisible, setIsNavBarVisible] = useState(true);

	const hideNavBar = () => setIsNavBarVisible(false);
	const showNavBar = () => setIsNavBarVisible(true);

	return (
		<NavigationContext.Provider
			value={{ isNavBarVisible, hideNavBar, showNavBar }}
		>
			{children}
		</NavigationContext.Provider>
	);
};
