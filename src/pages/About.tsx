import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const About = () => {
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
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-foreground mb-4">🎈 Balloon Bliss Bash 🎈</h1>
            <p className="text-xl text-muted-foreground">Pop, Score, Repeat!</p>
          </div>

          <div className="space-y-8">
            {/* Game Description */}
            <section className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" />
                About the Game
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Balloon Bliss Bash is an addictive, colorful balloon-popping game designed for players of all ages. 
                Experience the joy of popping balloons in this fast-paced, visually stunning arcade game. With multiple 
                game modes, exciting power-ups, and increasing difficulty, every session brings new challenges and 
                endless entertainment!
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-secondary/10 rounded-xl p-5">
                  <h3 className="font-bold text-foreground mb-2">🎮 Multiple Game Modes</h3>
                  <p className="text-sm text-muted-foreground">Classic, Time Attack, and Endless modes</p>
                </div>
                <div className="bg-secondary/10 rounded-xl p-5">
                  <h3 className="font-bold text-foreground mb-2">⚡ Exciting Power-Ups</h3>
                  <p className="text-sm text-muted-foreground">Slow-mo, extra lives, double score, and multi-pop</p>
                </div>
                <div className="bg-secondary/10 rounded-xl p-5">
                  <h3 className="font-bold text-foreground mb-2">🎨 Beautiful Graphics</h3>
                  <p className="text-sm text-muted-foreground">Vibrant colors and smooth animations</p>
                </div>
                <div className="bg-secondary/10 rounded-xl p-5">
                  <h3 className="font-bold text-foreground mb-2">🏆 High Score Tracking</h3>
                  <p className="text-sm text-muted-foreground">Compete with yourself and beat your records</p>
                </div>
                <div className="bg-secondary/10 rounded-xl p-5">
                  <h3 className="font-bold text-foreground mb-2">⚙️ Customizable Settings</h3>
                  <p className="text-sm text-muted-foreground">Adjust difficulty, sound, and visual effects</p>
                </div>
                <div className="bg-secondary/10 rounded-xl p-5">
                  <h3 className="font-bold text-foreground mb-2">📱 Cross-Platform</h3>
                  <p className="text-sm text-muted-foreground">Play on mobile, tablet, or desktop</p>
                </div>
              </div>
            </section>

            {/* Target Audience */}
            <section className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Perfect For</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  Casual gamers looking for quick fun
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  Families and children (all ages)
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  Anyone who needs a stress-relief break
                </li>
                <li className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  Arcade game enthusiasts
                </li>
              </ul>
            </section>

            {/* Version Info */}
            <section className="text-center">
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-sm text-muted-foreground mt-2">
                Made with <Heart className="w-4 h-4 inline text-red-500" /> for balloon lovers everywhere
              </p>
            </section>

{/* 
<p className="text-muted-foreground mb-4">
                Reach out to us at: 
                <Button onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSclEEA53Yv9Gh7mpQjGbBnGvnjFCgRRH0-k_DlUBmgPkZy3yQ/viewform?usp=header", "_blank")}
                variant="outline" */}
                {/* // className="w-full col-span-2" */}
                {/* >
                Share Your Opinion
                </Button>
                {/* support@github.com */}
              {/* </p>  */}
              

            {/* Contact/Support */}
            <section className="bg-primary/10 rounded-2xl p-6 text-center">
              <h2 className="text-xl font-bold text-foreground mb-3">Need Help?</h2>              
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/guide")} variant="secondary">
                  User Guide
                </Button>
                <Button onClick={() => navigate("/privacy")} variant="outline">
                  Privacy Policy
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
