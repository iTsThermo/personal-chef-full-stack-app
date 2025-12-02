import { Link } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu as MenuIcon } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import type { Key } from "react";

const components: { title: string | Key; link: string }[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Ingredients",
    link: "ingredients",
  },
  {
    title: "Recipes",
    link: "recipes",
  },
];

export function CustomNav() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 ">
      {/* Desktop Navigation - visible on medium and larger screens */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {components.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={item.link}>{item.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          {isAuthenticated ? (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <div
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Logout
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <div onClick={() => loginWithRedirect()}>Sign In</div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Navigation - visible on small screens */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" aria-description="Main Menu">
          <SheetTitle className="flex justify-center items-center mt-3">
            Chef's Special Menu
          </SheetTitle>
          <nav className="flex flex-col gap-4 p-4">
            {components.map((item, i) => (
              <Link to={item.link} key={i}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => loginWithRedirect()}
              >
                Sign In
              </Button>
            )}
          </nav>
          <SheetDescription className="flex justify-center items-center">
            Create More, Waste Less
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
