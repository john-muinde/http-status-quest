import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Heart,
  Star,
  AlertCircle,
  Home,
  RotateCcw,
  Sparkles,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { statusCategories, gameLevels } from "../data/gameData";
import {
  advancedChallenges,
  realWorldScenarios,
  specialChallenges,
} from "../data/advancedChallenges";
import GameLevel from "./GameLevel";
import StatusCard from "./StatusCard";
import DifficultySelector from "./DifficultySelector";
import GameTimer from "./GameTimer";
import StatusCodeSearch from "../StatusCodeSearch";
import ActivePlayers from "./ActivePlayers";

const SCREENS = {
  WELCOME: "welcome",
  MENU: "menu",
  PLAYING: "playing",
  PAUSED: "paused",
  GAME_OVER: "gameOver",
  VICTORY: "victory",
};

const QUESTION_TIME = 60; // Time per question in seconds

const MemoizedGameLevel = memo(GameLevel);
const MemoizedStatusCard = memo(StatusCard);

const GameHeader = memo(({ score, combo, lives, onHome, onRestart }) => (
  <motion.div
    className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-md space-y-4 sm:space-y-0"
    layout
  >
    {/* Top row on mobile, left side on desktop */}
    <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
      <div className="flex items-center space-x-2">
        <button
          onClick={onHome}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Return to Menu"
        >
          <Home className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={onRestart}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Restart Game"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <ActivePlayers />
    </div>

    {/* Bottom row on mobile, right side on desktop */}
    <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
      <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-lg">
        <Star className="w-4 h-4 text-yellow-500 mr-1.5" />
        <span className="text-lg font-semibold">{score}</span>
      </div>
      <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-lg">
        <Sparkles className="w-4 h-4 text-blue-500 mr-1.5" />
        <span className="text-lg font-semibold">{combo}x</span>
      </div>
      <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-lg">
        {[...Array(3)].map((_, i) => (
          <Heart
            key={i}
            className={`w-4 h-4 ${
              i < lives ? "text-red-500" : "text-gray-300"
            }`}
            fill={i < lives ? "currentColor" : "none"}
          />
        ))}
      </div>
    </div>
  </motion.div>
));

GameHeader.displayName = "GameHeader";

const HTTPGame = () => {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [difficulty, setDifficulty] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedCode, setSelectedCode] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [combo, setCombo] = useState(0);
  const [highestCombo, setHighestCombo] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [timerKey, setTimerKey] = useState(0); // Add this to force timer reset

  const handleTimeUp = useCallback(() => {
    setScreen(SCREENS.GAME_OVER);
  }, []);

  const loadChallenges = useCallback((selectedDifficulty) => {
    switch (selectedDifficulty) {
      case "normal":
        setChallenges(gameLevels);
        break;
      case "hard":
        setChallenges([...advancedChallenges]);
        break;
      case "expert":
        setChallenges([...realWorldScenarios, ...specialChallenges]);
        break;
      default:
        setChallenges(gameLevels);
    }
  }, []);

  const handleDifficultySelect = useCallback(
    (selectedDifficulty) => {
      setDifficulty(selectedDifficulty);
      loadChallenges(selectedDifficulty);
      setScreen(SCREENS.PLAYING);
      resetGame();
    },
    [loadChallenges]
  );

  const resetGame = useCallback(() => {
    setCurrentLevel(0);
    setScore(0);
    setLives(3);
    setSelectedCode(null);
    setIsRevealed(false);
    setCombo(0);
    setShowHint(false);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] =
    useState(statusCategories);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredCategories(statusCategories);
      return;
    }

    const searchLower = term.toLowerCase();
    const filtered = Object.entries(statusCategories).reduce(
      (acc, [category, codes]) => {
        const matchedCodes = codes.filter(
          (status) =>
            status.code.toString().includes(searchLower) ||
            status.name.toLowerCase().includes(searchLower)
        );
        if (matchedCodes.length > 0) {
          acc[category] = matchedCodes;
        }
        return acc;
      },
      {}
    );
    setFilteredCategories(filtered);
  }, []);

  const handleAnswer = useCallback(
    (code) => {
      if (isRevealed || screen !== SCREENS.PLAYING) return;

      setSelectedCode(code);
      setIsRevealed(true);

      const currentChallenge = challenges[currentLevel];
      const isCorrect = code === currentChallenge.expectedCode;

      if (isCorrect) {
        const newCombo = combo + 1;
        setCombo(newCombo);
        setHighestCombo((prev) => Math.max(prev, newCombo));

        const basePoints = currentChallenge.bonusPoints;
        const comboBonus = combo * 25;
        const totalPoints = basePoints + comboBonus;

        setScore((prev) => prev + totalPoints);
      } else {
        setCombo(0);
        setLives((prev) => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setTimeout(() => setScreen(SCREENS.GAME_OVER), 1000);
          }
          return newLives;
        });
      }

      // Move to next question after a delay
      setTimeout(() => {
        if (currentLevel < challenges.length - 1) {
          setCurrentLevel((prev) => prev + 1);
          setSelectedCode(null);
          setIsRevealed(false);
          setShowHint(false);
          setSearchTerm("");
          setFilteredCategories(statusCategories);
          setTimerKey((prev) => prev + 1); // Reset timer for next question
        } else {
          setScreen(SCREENS.VICTORY);
        }
      }, 2000);
    },
    [challenges, currentLevel, combo, screen, isRevealed]
  );

  const renderWelcomeScreen = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto text-center space-y-8 bg-white p-12 rounded-2xl shadow-xl"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        HTTP Status Quest
      </motion.div>

      <p className="text-xl text-gray-600">
        Master HTTP status codes through an engaging challenge!
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScreen(SCREENS.MENU)}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
      >
        Start Your Journey <ChevronRight className="inline ml-2" />
      </motion.button>
    </motion.div>
  );

  const renderMenuScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto space-y-8 bg-white p-8 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Select Your Challenge Level
      </h2>
      <DifficultySelector
        selectedDifficulty={difficulty}
        onSelect={handleDifficultySelect}
      />
    </motion.div>
  );

  const renderGameScreen = () => {
    const currentChallenge = challenges[currentLevel];

    return (
      <div className="space-y-4">
        <GameHeader
          score={score}
          combo={combo}
          lives={lives}
          onHome={() => setScreen(SCREENS.MENU)}
          onRestart={() => {
            resetGame();
            loadChallenges(difficulty);
          }}
        />

        {/* Quick Navigation for Mobile */}
        <div className="lg:hidden flex space-x-2 sticky top-0 z-20 bg-gray-50 p-2">
          <button
            onClick={() =>
              document
                .getElementById("question-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="flex-1 bg-white p-2 rounded-lg shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Question
          </button>
          <button
            onClick={() =>
              document
                .getElementById("choices-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="flex-1 bg-white p-2 rounded-lg shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Choices
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Question Section */}
          <div id="question-section" className="lg:order-1 space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
              <GameTimer
                key={timerKey}
                initialTime={QUESTION_TIME}
                isPlaying={screen === SCREENS.PLAYING}
                onTimeUp={handleTimeUp}
              />

              <MemoizedGameLevel level={currentChallenge} />

              {!showHint && !isRevealed && (
                <button
                  onClick={() => {
                    setShowHint(true);
                    setScore((prev) => Math.max(0, prev - 50));
                  }}
                  className="w-full p-3 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>Need a hint? (-50 points)</span>
                </button>
              )}

              {showHint && (
                <Alert>
                  <AlertTitle>Hint</AlertTitle>
                  <AlertDescription>{currentChallenge.hint}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* Choices Section */}
          <div id="choices-section" className="lg:order-2 space-y-4">
            <div className="sticky top-16 lg:top-4 bg-white p-4 rounded-xl shadow-md z-10">
              <StatusCodeSearch onFilter={handleSearch} />
            </div>

            <div className="bg-white rounded-xl shadow-md divide-y">
              {Object.entries(filteredCategories).map(([category, codes]) => (
                <motion.div key={category} layout className="p-3">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {codes.map((status) => (
                      <MemoizedStatusCard
                        key={status.code}
                        code={status.code}
                        name={status.name}
                        onClick={() => handleAnswer(status.code)}
                        isSelected={selectedCode === status.code}
                        isCorrect={
                          isRevealed &&
                          status.code === currentChallenge.expectedCode
                        }
                        isRevealed={isRevealed}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="fixed bottom-0 left-0 w-full h-1 bg-gray-200"
          layout
        >
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentLevel / challenges.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    );
  };

  const renderEndScreen = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl text-center space-y-8"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 1 }}
        className="inline-block"
      >
        {screen === SCREENS.VICTORY ? (
          <Trophy className="w-24 h-24 text-yellow-500" />
        ) : (
          <AlertCircle className="w-24 h-24 text-red-500" />
        )}
      </motion.div>

      <h1 className="text-4xl font-bold">
        {screen === SCREENS.VICTORY ? "Congratulations!" : "Game Over"}
      </h1>

      <div className="space-y-4">
        <p className="text-2xl">Final Score: {score}</p>
        <p className="text-xl">Highest Combo: {highestCombo}x</p>
        <p className="text-lg text-gray-600">
          Completed {currentLevel} out of {challenges.length} challenges
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => {
            resetGame();
            loadChallenges(difficulty);
            setScreen(SCREENS.PLAYING);
          }}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
        <button
          onClick={() => {
            setScreen(SCREENS.MENU);
            resetGame();
          }}
          className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg text-xl hover:bg-gray-200 transition-colors"
        >
          Main Menu
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <AnimatePresence mode="wait">
        {screen === SCREENS.WELCOME && renderWelcomeScreen()}
        {screen === SCREENS.MENU && renderMenuScreen()}
        {screen === SCREENS.PLAYING && renderGameScreen()}
        {(screen === SCREENS.GAME_OVER || screen === SCREENS.VICTORY) &&
          renderEndScreen()}
      </AnimatePresence>
    </div>
  );
};

export default HTTPGame;
