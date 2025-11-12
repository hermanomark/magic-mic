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
} from "@/components/ui/sheet"
import { ModeToggle } from "./ModeToggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#shop" },
    { label: "Videos", href: "#videos" },
  ];

  return (
    <div className="w-full flex gap-4 justify-between items-center">
      {/* Mobile Hamburger Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px]">
          <nav className="flex flex-col gap-4 mt-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg font-medium hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Logo - Left on desktop, center on mobile */}
      <div className="flex-1 md:flex-none md:min-w-[150px] flex justify-center md:justify-start">
        <a href="#home" className="text-2xl font-bold">
          LOGO
        </a>
      </div>

      {/* Desktop Navigation - Centered */}
      <NavigationMenu className="hidden md:flex flex-1 justify-center">
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.label} className="cursor-pointer">
              <NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mode Toggle - Right side */}
      <div className="md:min-w-[150px] flex justify-end">
        <ModeToggle />
      </div>
    </div >
  )
}

export default Navigation;