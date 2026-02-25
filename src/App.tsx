import { TooltipProvider } from "@/components/atoms/tooltip";
import { Outlet } from "react-router";


function App() {
  return (
    <TooltipProvider>
      <Outlet />
    </TooltipProvider>
  );
}

export default App;
