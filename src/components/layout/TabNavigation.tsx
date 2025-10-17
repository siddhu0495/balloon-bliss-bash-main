import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Play, Settings as SettingsIcon } from "lucide-react";
import { BalloonGame } from "../game/BalloonGame";
import { ScoresTab } from "./ScoresTab";
import { SettingsTab } from "./SettingsTab";

export const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("play");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(200,100%,85%)] to-[hsl(330,85%,80%)]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-screen flex flex-col">
        <TabsList className="grid w-full grid-cols-3 rounded-none h-16 bg-white/90 backdrop-blur-sm border-b">
          <TabsTrigger 
            value="play" 
            className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Play className="w-5 h-5 mr-2" />
            Play
          </TabsTrigger>
          <TabsTrigger 
            value="scores"
            className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Scores
          </TabsTrigger>
          <TabsTrigger 
            value="settings"
            className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <SettingsIcon className="w-5 h-5 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="play" className="flex-1 m-0">
          <BalloonGame />
        </TabsContent>

        <TabsContent value="scores" className="flex-1 m-0 overflow-auto">
          <ScoresTab />
        </TabsContent>

        <TabsContent value="settings" className="flex-1 m-0 overflow-auto">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
