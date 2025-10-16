import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                Balloon Bliss Bash collects minimal information to provide you with the best gaming experience:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Display name (stored locally)</li>
                <li>Game scores and settings (stored locally)</li>
                <li>Anonymous usage analytics (if enabled)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Provide and maintain game functionality</li>
                <li>Save your game progress and high scores</li>
                <li>Improve game performance and user experience</li>
                <li>Display personalized content (display name)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. Data Storage</h2>
              <p className="text-muted-foreground">
                All game data is stored locally on your device using browser local storage. We do not transmit your personal data to external servers unless explicitly stated for specific features like leaderboards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Advertising</h2>
              <p className="text-muted-foreground">
                Balloon Bliss Bash may display advertisements through Google AdMob. AdMob may collect and use data for ad personalization. You can opt out of personalized advertising in your device settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our game is suitable for all ages. We do not knowingly collect personal information from children under 13. The app complies with COPPA regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Third-Party Services</h2>
              <p className="text-muted-foreground">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Google AdMob (for advertisements)</li>
                <li>Device capabilities (for sound and haptics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Clear all locally stored data at any time</li>
                <li>Disable sound effects and particle animations</li>
                <li>Contact us with privacy concerns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                Email: support@github.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
