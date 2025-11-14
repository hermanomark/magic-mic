import { Link, Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { SquareArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header - Fixed at top with backdrop blur for modern look */}
      <Navigation />

      {/* Main Content Area - Flexible and responsive */}
      <main className="flex-1 w-full min-h-screen">
        <div className="w-full mx-auto py-4 sm:py-8 lg:py-12">
          <Outlet />
        </div>
      </main>

      {/* Footer - Optional, uncomment if needed */}
      <footer className="w-full bg-background">
        <div className="container mx-auto py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Magic Mic. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <SquareArrowUp onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 z-50 p-0 h-8 w-8 cursor-pointer"
          aria-label="Scroll to top" />
      )}
    </div>
  );
};

export default MainLayout;
