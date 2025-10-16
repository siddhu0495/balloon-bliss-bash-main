import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Heart, Trophy, Clock, Star, Bomb } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UserGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Game
        </Button>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-foreground mb-6">User Guide</h1>
          <p className="text-muted-foreground mb-8">Everything you need to know to become a Balloon Bliss Bash master!</p>

          <div className="space-y-8">
            {/* How to Play */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-accent" />
                How to Play
              </h2>
              <div className="bg-secondary/10 rounded-xl p-6 space-y-3">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Objective:</strong> Pop as many balloons as you can before they float away!
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Controls:</strong> Simply tap or click on balloons to pop them.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Pause:</strong> Press ESC or click the Pause button to pause the game.
                </p>
              </div>
            </section>

            {/* Game Modes */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Game Modes</h2>
              <div className="grid gap-4">
                <div className="bg-primary/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Classic Mode</h3>
                  <p className="text-muted-foreground">
                    Standard gameplay with limited lives. Miss too many balloons and it's game over!
                  </p>
                </div>
                <div className="bg-accent/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time Attack Mode
                  </h3>
                  <p className="text-muted-foreground">
                    Race against the clock! Pop as many balloons as possible before time runs out.
                  </p>
                </div>
                <div className="bg-secondary/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Endless Mode</h3>
                  <p className="text-muted-foreground">
                    No lives limit! Play as long as you want and see how high you can score.
                  </p>
                </div>
              </div>
            </section>

            {/* Balloon Types */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Balloon Types</h2>
              <div className="grid gap-3">
                <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                    10
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Normal Balloons</h4>
                    <p className="text-sm text-muted-foreground">Worth 10 points each</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-yellow-50 rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Golden Balloons</h4>
                    <p className="text-sm text-muted-foreground">Worth 50 points! Rare but valuable</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-red-50 rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <Bomb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Bomb Balloons</h4>
                    <p className="text-sm text-muted-foreground">Deducts 20 points. Avoid these!</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Power-Ups */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-accent" />
                Power-Ups
              </h2>
              <div className="grid gap-3">
                <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-4">
                  <Clock className="w-10 h-10 text-blue-600" />
                  <div>
                    <h4 className="font-bold text-foreground">Slow Motion</h4>
                    <p className="text-sm text-muted-foreground">Slows down all balloons for 10 seconds</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-red-50 rounded-xl p-4">
                  <Heart className="w-10 h-10 text-red-600" />
                  <div>
                    <h4 className="font-bold text-foreground">Extra Life</h4>
                    <p className="text-sm text-muted-foreground">Grants one additional life</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-yellow-50 rounded-xl p-4">
                  <Trophy className="w-10 h-10 text-yellow-600" />
                  <div>
                    <h4 className="font-bold text-foreground">Double Score</h4>
                    <p className="text-sm text-muted-foreground">Doubles all points for 10 seconds</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-purple-50 rounded-xl p-4">
                  <Star className="w-10 h-10 text-purple-600" />
                  <div>
                    <h4 className="font-bold text-foreground">Multi Pop</h4>
                    <p className="text-sm text-muted-foreground">Pop multiple balloons at once for 5 seconds</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Difficulty Levels */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Difficulty Levels</h2>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-bold text-foreground mb-1">Easy</h4>
                  <p className="text-sm text-muted-foreground">7 lives, slower balloons, more time</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h4 className="font-bold text-foreground mb-1">Medium</h4>
                  <p className="text-sm text-muted-foreground">5 lives, moderate speed, standard time</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <h4 className="font-bold text-foreground mb-1">Hard</h4>
                  <p className="text-sm text-muted-foreground">3 lives, fast balloons, less time</p>
                </div>
              </div>
            </section>

            {/* Tips & Tricks */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Tips & Tricks</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Focus on golden balloons when they appear for maximum points
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Always avoid bomb balloons to maintain your score
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Collect power-ups immediately for strategic advantages
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Watch out for balloons near the top of the screen
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  In Time Attack mode, prioritize speed over accuracy
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
