import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router";

interface prop {
    children: React.ReactNode;
}
export const PageTransitionProvider = ({ children }: prop) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};