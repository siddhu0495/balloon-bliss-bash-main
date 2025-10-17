import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { GameSettings, getGameSettings } from "@/pages/Settings";

const DEFAULT_SETTINGS: GameSettings = {
  displayName: "Player",
  soundEnabled: true,
  soundVolume: 70,
  difficulty: "medium",
  particlesEnabled: true,
};

export const SettingsTab = () => {
  const [settings, setSettings] = useState<GameSettings>(getGameSettings());

  useEffect(() => {
    localStorage.setItem("gameSettings", JSON.stringify(settings));
  }, [settings]);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    toast.info("Settings reset to default");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(200,100%,85%)] to-[hsl(330,85%,80%)] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-primary mb-6">Settings</h1>

          <div className="space-y-6">
            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={settings.displayName}
                onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
                placeholder="Enter your name"
                maxLength={20}
              />
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                value={settings.difficulty}
                onValueChange={(value: "easy" | "medium" | "hard") =>
                  setSettings({ ...settings, difficulty: value })
                }
              >
                <SelectTrigger id="difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy - Slower balloons, more time</SelectItem>
                  <SelectItem value="medium">Medium - Balanced gameplay</SelectItem>
                  <SelectItem value="hard">Hard - Faster balloons, less time</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {settings.difficulty === "easy" && "Perfect for beginners"}
                {settings.difficulty === "medium" && "A balanced challenge"}
                {settings.difficulty === "hard" && "For experienced players"}
              </p>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between space-y-2">
              <div className="space-y-0.5">
                <Label htmlFor="sound">Sound Effects</Label>
                <p className="text-sm text-muted-foreground">
                  Enable or disable all game sounds
                </p>
              </div>
              <Switch
                id="sound"
                checked={settings.soundEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, soundEnabled: checked })
                }
              />
            </div>

            {/* Volume Slider */}
            {settings.soundEnabled && (
              <div className="space-y-2">
                <Label htmlFor="volume">Sound Volume: {settings.soundVolume}%</Label>
                <Slider
                  id="volume"
                  value={[settings.soundVolume]}
                  onValueChange={(value) =>
                    setSettings({ ...settings, soundVolume: value[0] })
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            )}

            {/* Particles Toggle */}
            <div className="flex items-center justify-between space-y-2">
              <div className="space-y-0.5">
                <Label htmlFor="particles">Particle Effects</Label>
                <p className="text-sm text-muted-foreground">
                  Show particle animations when popping balloons
                </p>
              </div>
              <Switch
                id="particles"
                checked={settings.particlesEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, particlesEnabled: checked })
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button onClick={handleSave} className="flex-1">
                Save Settings
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Reset to Default
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
