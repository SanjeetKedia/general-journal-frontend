import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex">
      <nav className="flex flex-col">
        <Link to={"/journal"}>Journal</Link>
        <Link to={"/account"}>Account</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
