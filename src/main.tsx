import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import "./index.css";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
		<Provider store={store}>
			<App />
			<ToastContainer />
			<Toaster />
		</Provider>
	</ThemeProvider>,
	// </React.StrictMode>,
);
