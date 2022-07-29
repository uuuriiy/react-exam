import { useRoutes } from "react-router-dom";
import { routes } from "./lib/routes"

function App() {
  const routeItems = useRoutes(routes);
  
  return routeItems;
}

export default App;
