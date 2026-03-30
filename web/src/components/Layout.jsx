import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
    const location = useLocation();
    const hiddenPaths = ["/login", "/register"];
    const layoutVisible = !hiddenPaths.includes(location.pathname);

    return (
        <div className="w-screen min-h-screen bg-linear-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
            {layoutVisible && <Navbar />}
            <main
                className={`${layoutVisible
                    ? "container mx-auto w-full min-h-screen md:pt-16 pt-32"
                    : "flex items-center justify-center min-h-screen"
                    }`}
            >
                {children}
            </main>
            {layoutVisible && <Footer />}
        </div>
    );
}