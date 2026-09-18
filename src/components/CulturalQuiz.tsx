import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle, HelpCircle, Trophy, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  id: number;
  question: string;
  state: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which ancient architectural wonder in Odisha was built as a giant 24-wheeled chariot for the Sun God?",
    state: "Odisha",
    options: ["Brihadeeswara Temple", "Konark Sun Temple", "Khajuraho Temples", "Meenakshi Temple"],
    correctIndex: 1,
    explanation: "Konark Sun Temple in Odisha was constructed in the 13th century CE by King Narasimhadeva I. Its 24 stone wheels act as intricate sundials.",
    category: "Architecture"
  },
  {
    id: 2,
    question: "Which classical Indian dance form is famous for vivid facial makeup, elaborate headgear, and storytelling from Kerala?",
    state: "Kerala",
    options: ["Kathak", "Kathakali", "Bharatanatyam", "Kuchipudi"],
    correctIndex: 1,
    explanation: "Kathakali originated in Kerala during the 17th century. Dancers wear striking mineral face makeup (Chutti) and depict epic stories from the Ramayana and Mahabharata.",
    category: "Dance & Art"
  },
  {
    id: 3,
    question: "The historic Hawa Mahal in Jaipur has how many small windows (Jharokhas) designed to keep the palace naturally cool?",
    state: "Rajasthan",
    options: ["365 windows", "500 windows", "953 windows", "1,200 windows"],
    correctIndex: 2,
    explanation: "Built in 1799 by Maharaja Sawai Pratap Singh, Hawa Mahal has 953 honeycombed jharokhas that allow cool breezes through the Venturi effect.",
    category: "Heritage"
  },
  {
    id: 4,
    question: "Which holy city on the banks of the River Ganga is renowned for its world-famous evening Maha Aarti with multi-tiered brass lamps?",
    state: "Uttar Pradesh",
    options: ["Varanasi", "Mathura", "Ayodhya", "Prayagraj"],
    correctIndex: 0,
    explanation: "Varanasi's Dashashwamedh Ghat hosts the divine Ganga Aarti every evening at dusk, illuminated by hundreds of incense sticks and grand brass oil lamps.",
    category: "Spiritual"
  },
  {
    id: 5,
    question: "Which sacred Sikh shrine in Amritsar serves over 100,000 free hot vegetarian meals daily at the world's largest community kitchen?",
    state: "Punjab",
    options: ["Bangla Sahib", "Golden Temple (Harmandir Sahib)", "Hemkund Sahib", "Patna Sahib"],
    correctIndex: 1,
    explanation: "The Golden Temple's Langar in Amritsar exemplifies selfless service (Seva) and equality, feeding more than 100,000 pilgrims every single day.",
    category: "Heritage"
  }
];

export const CulturalQuiz = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem("bharat_quiz_score");
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      const newScore = score + 10;
      setScore(newScore);
      setStreak((prev) => prev + 1);
      localStorage.setItem("bharat_quiz_score", newScore.toString());
      playSuccessChime();
    } else {
      setStreak(0);
    }
  };

  const playSuccessChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {}
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizCompleted(false);
    setStreak(0);
  };

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-10 border border-primary/20 relative overflow-hidden shadow-[0_15px_50px_-15px_rgba(234,88,12,0.2)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Badge variant="outline" className="text-xs uppercase tracking-wider text-primary border-primary/30 mb-2 px-3 py-1">
            🧠 Test Your Bharat Knowledge
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Bharat Gyan <span className="text-gradient-saffron">Cultural Trivia</span>
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 rounded-2xl border border-primary/30 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-gold" />
            <div className="text-left">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Gyan Score</p>
              <p className="text-sm font-bold text-gold">{score} pts</p>
            </div>
          </div>
          {streak > 1 && (
            <Badge className="bg-primary/20 text-primary border border-primary/40 px-3 py-1.5 animate-bounce">
              🔥 {streak} Streak!
            </Badge>
          )}
        </div>
      </div>

      {!quizCompleted ? (
        <div className="space-y-6">
          {/* Question Card */}
          <div className="bg-background/40 rounded-2xl p-5 sm:p-6 border border-white/10">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-primary">
                Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <Badge variant="secondary" className="text-[11px] bg-white/5 text-muted-foreground">
                📍 {currentQ.state} • {currentQ.category}
              </Badge>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-foreground leading-relaxed">
              {currentQ.question}
            </h4>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let btnStyle = "bg-card/60 hover:bg-card/90 border-white/10 text-foreground";

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-red-500/20 border-red-500 text-red-400 font-medium";
                } else {
                  btnStyle = "bg-card/30 border-white/5 text-muted-foreground opacity-60";
                }
              }

              return (
                <motion.button
                  key={idx}
                  type="button"
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation & Next Trigger */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-primary/10 rounded-2xl p-4 sm:p-5 border border-primary/20 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Cultural Insight</p>
                    <p className="text-xs sm:text-sm text-foreground/90 mt-1 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-saffron text-primary-foreground font-semibold px-6 py-2 rounded-xl text-sm"
                  >
                    {currentIdx < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Complete Quiz"} <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Completion State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-gold mx-auto flex items-center justify-center text-primary-foreground shadow-[0_0_30px_rgba(234,88,12,0.6)]">
            <Trophy className="h-8 w-8" />
          </div>
          <h4 className="text-2xl font-bold text-foreground">You Are a Certified Bharat Explorer! 🎉</h4>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            You tested your knowledge of India's classical architecture, dances, and timeless traditions. Keep discovering through our 3D Virtual Yatras!
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Button
              type="button"
              onClick={handleRestart}
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10 rounded-xl"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Play Again
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
