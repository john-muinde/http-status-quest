import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import StatusCodesPage from "./pages/StatusCodesPage";
import HowToPlayPage from "./pages/HowToPlayPage";
import PageTransition from "./components/PageTransition";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/play"
          element={
            <PageTransition>
              <GamePage />
            </PageTransition>
          }
        />
        <Route
          path="/status-codes"
          element={
            <PageTransition>
              <StatusCodesPage />
            </PageTransition>
          }
        />
        <Route
          path="/how-to-play"
          element={
            <PageTransition>
              <HowToPlayPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
