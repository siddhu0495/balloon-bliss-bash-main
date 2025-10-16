import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Terms = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-6">Terms & Conditions</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By downloading, installing, or using Balloon Bliss Bash ("the Game"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Game.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">2. License to Use</h2>
              <p className="text-muted-foreground">
                We grant you a limited, non-exclusive, non-transferable, revocable license to use the Game for personal, non-commercial entertainment purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">3. User Conduct</h2>
              <p className="text-muted-foreground">You agree not to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Modify, reverse engineer, or decompile the Game</li>
                <li>Use cheats, exploits, or unauthorized third-party software</li>
                <li>Attempt to hack or interfere with the Game's functionality</li>
                <li>Use the Game for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">4. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content, features, and functionality of the Game, including but not limited to graphics, logos, icons, and software, are the exclusive property of Balloon Bliss Bash and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">5. In-Game Purchases & Ads</h2>
              <p className="text-muted-foreground">
                The Game may offer in-app purchases and display advertisements. All purchases are final and non-refundable unless required by applicable law. Ad viewing for extra lives is optional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">6. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                The Game is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the Game will be error-free, uninterrupted, or free from viruses or other harmful components.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Balloon Bliss Bash, its developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use the Game.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">8. Updates and Modifications</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue the Game at any time without notice. We may also update these Terms and Conditions periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">9. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your access to the Game immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">10. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with applicable international laws, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">11. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms & Conditions, contact us at:
                <br />
                Email: legal@balloonblissbash.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
