import { Link, Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background px-4">
      {/* Header - Fixed at top with backdrop blur for modern look */}
      <Navigation />

      {/* Main Content Area - Flexible and responsive */}
      <main className="flex-1 w-full">
        <div className="container mx-auto py-4 sm:py-8 lg:py-12">
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
    </div>
  );
};

export default MainLayout;
