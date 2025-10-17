import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Trash2, TrendingUp, Target, Clock, Award } from "lucide-react";
import { toast } from "sonner";
import { getScores, getGameStats, ScoreEntry } from "@/pages/Scores";

export const ScoresTab = () => {
  const [scores, setScores] = useState<ScoreEntry[]>(getScores());
  const [filter, setFilter] = useState<string>("all");
  const stats = getGameStats();

  const filteredScores = filter === "all" 
    ? scores 
    : scores.filter(s => s.mode === filter);

  const handleClearScores = () => {
    if (confirm("Are you sure you want to clear all score history?")) {
      localStorage.removeItem("gameScores");
      setScores([]);
      toast.success("Score history cleared");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const averageScore = stats.totalGames > 0 ? Math.round(stats.totalScore / stats.totalGames) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(200,100%,85%)] to-[hsl(330,85%,80%)] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Statistics Cards */}
        {stats.totalGames > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 text-primary mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Avg Score</span>
              </div>
              <div className="text-2xl font-bold">{averageScore}</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 text-secondary mb-2">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">Best Streak</span>
              </div>
              <div className="text-2xl font-bold">{stats.bestStreak} days</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Play Time</span>
              </div>
              <div className="text-2xl font-bold">{formatTime(stats.totalPlayTime)}</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Achievements</span>
              </div>
              <div className="text-2xl font-bold">{stats.achievements.length}</div>
            </div>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-primary">Score History</h1>
            </div>
            {scores.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearScores}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All Games
            </Button>
            <Button
              variant={filter === "classic" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("classic")}
            >
              Classic
            </Button>
            <Button
              variant={filter === "timeattack" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("timeattack")}
            >
              Time Attack
            </Button>
            <Button
              variant={filter === "endless" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("endless")}
            >
              Endless
            </Button>
          </div>

          {/* Scores List */}
          {filteredScores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">No scores yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Play some games to see your scores here!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredScores.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 font-bold text-primary">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{entry.playerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.mode.charAt(0).toUpperCase() + entry.mode.slice(1)} Mode
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {entry.score}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(entry.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
