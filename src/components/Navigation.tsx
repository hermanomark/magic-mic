import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { ModeToggle } from "./ModeToggle";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Videos", to: "/videos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background1/90 backdrop-blur-md px-4">
      <div className="container mx-auto h-16 w-full flex gap-4 justify-between items-center">
        {/* Mobile Hamburger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[350px]">
            <nav className="flex flex-col gap-4 mt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm font-medium text-primary hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo - Left on desktop, center on mobile */}
        <div className="flex-1 md:flex-none md:min-w-[150px] flex justify-center md:justify-start">
          <Link to="/" className="text-2xl font-bold">
            LOGO
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.label} className="cursor-pointer ">
                <NavigationMenuLink asChild className="hover:bg-primary/10">
                  <Link to={item.to} className="text-primary hover:text-primary">{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mode Toggle - Right side */}
        <div className="md:min-w-[150px] flex justify-end">
          <ModeToggle />
        </div>
      </div >
    </header>
  )
}

export default Navigation;