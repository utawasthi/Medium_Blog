import { useEffect, useState } from "react";
import { Quote } from "../components/Quote";
import { SignupAuth } from "../components/SignupAuth";

const Signup = () => {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setShowQuote(window.innerWidth >= 1024); // Tailwind's `lg` = 1024px
    };

    checkScreenSize(); // run once on mount
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div>
        <SignupAuth />
      </div>

      {showQuote && (
        <div>
          <Quote />
        </div>
      )}
    </div>
  );
};

export default Signup;
