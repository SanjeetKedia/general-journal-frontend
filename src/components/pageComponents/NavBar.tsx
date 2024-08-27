import { Separator } from "@radix-ui/react-separator";
import { Menu, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ routes }: { routes: { route: string; text: string }[] }) => {
  const [isCollasped, setIsCollasped] = useState(true);

  const toggleMenu = () => setIsCollasped(!isCollasped);

  const handleMouseOver = () => setIsCollasped(false);
  const handleMouseExit = () => setIsCollasped(true);

  return (
    <>
      {isCollasped ? (
        <nav className="flex-flex-col pt-5 w-auto transition-all duration-500 ease-in-out h-screen">
          <SidebarOpenIcon
            className="cursor-pointer hover:bg-secondary h-full mt-2 mr-2 text-primary"
            onClick={toggleMenu}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseExit}
          />
        </nav>
      ) : (
        <nav
          className="flex flex-col min-w-fit bg-secondary text-2xl pt-5 h-screen text-secondary-foreground transition-all duration-500 ease-out"
          onMouseLeave={handleMouseExit}
        >
          <h1 className="text-center pb-2">Menu</h1>
          <Separator className="mx-auto h-1 rounded-full" />
          {routes.map((route, i) => {
            return (
              <Link
                className="p-2 hover:bg-primary hover:text-primary-foreground transition-colors ease-in pr-6"
                to={route.route}
                key={i}
              >
                {route.text}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
};

export default NavBar;
