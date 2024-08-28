import NavBar from "@/components/pageComponents/NavBar";
import { Outlet } from "react-router-dom";

const routes = [
  {
    route: "/journal",
    text: "Journal",
  },
  {
    route: "/account",
    text: "Account",
  },
  { route: "/ledger", text: "Ledger" },
  { route: "/trial-balance", text: "Trial Balance" },
];

function App() {
  return (
    <div className="flex h-screen">
      <NavBar routes={routes} />
      <Outlet />
    </div>
  );
}

export default App;
