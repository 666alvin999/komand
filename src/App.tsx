import "./styles/index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "./loginPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MenuPage} from "./menuPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />
	},
	{
		path: "/menu",
		element: <MenuPage />
	}
]);

const queryClient = new QueryClient();

function App() {

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);

}

export default App;
