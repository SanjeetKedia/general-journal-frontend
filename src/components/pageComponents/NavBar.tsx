import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";

const NavBar = ({ routes }: { routes: { route: string; text: string }[] }) => {
  return (
    <>
      <nav className="flex flex-col w-1/12 bg-secondary text-2xl pt-2 h-screen text-secondary-foreground">
        <h1 className="text-center pb-2">Menu</h1>
        <Separator className="mx-auto h-1 rounded-full" />
        {routes.map((route, i) => {
          return (
            <Link
              className="p-2 hover:bg-primary hover:text-primary-foreground transition-colors ease-in "
              to={route.route}
              key={i}
            >
              {route.text}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default NavBar;
