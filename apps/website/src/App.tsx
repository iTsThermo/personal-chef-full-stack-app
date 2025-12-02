// Added icons
import { CookingPotIcon } from "lucide-react";

// Import react router dom
import { Link, Outlet } from "react-router-dom";

// import auth0
import { CustomNav } from "./components/CustomNav";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-5">
        <Link to={"/"} className="flex items-center justify-center gap-3">
          <CookingPotIcon />
          <h1>Personal Chef</h1>
        </Link>
        <nav>
          <CustomNav />
        </nav>
      </header>
      <main className="flex-grow mx-5 sm:mx-10 md:mx-20 lg:mx-40">
        <Toaster />
        <Outlet />
      </main>
      <footer className="flex justify-center items-center mt-20">
        <small>Copyright &copy; 2025. All rights reserved.</small>
      </footer>
    </div>
  );
}
