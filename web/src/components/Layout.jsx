import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
    const location = useLocation();
    const hiddenPaths = ["/login", "/register"];
    const layoutVisible = !hiddenPaths.includes(location.pathname);

    return (
        <div className="w-screen min-h-screen bg-amber-50 dark:bg-neutral-800 dark:text-white">
            {layoutVisible && <Navbar />}
            <main
                className={`${layoutVisible
                    ? "container mx-auto w-full min-h-screen pt-16"
                    : "flex items-center justify-center min-h-screen"
                    }`}
            >
                {children}
            </main>
            {layoutVisible && <Footer />}
        </div>
    );
}