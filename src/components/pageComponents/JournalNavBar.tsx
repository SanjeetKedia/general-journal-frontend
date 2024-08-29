import { PropsWithChildren } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const JournalNavBar = () => {
  const location = useLocation();

  const NavLink = ({
    to,
    children,
  }: PropsWithChildren<{
    className?: string;
    to: string;
  }>) => {
    const ifCorrectClass = location.pathname == to ? "bg-secondary" : "";

    return (
      <Link
        className={cn(
          "text-xl h-full py-2 px-2 hover:bg-secondary hover:text-secondary-foreground",
          ifCorrectClass
        )}
        to={to}
      >
        {children}
      </Link>
    );
  };

  return (
    <NavigationMenu className="py-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/journal">Journal</NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to="/journal/old">Old Journal</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default JournalNavBar;
