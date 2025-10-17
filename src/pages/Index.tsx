// Temporarily commented below lines - Need to update later on and CSS to be modified

// import { TabNavigation } from "@/components/layout/TabNavigation";
import { BalloonGame } from "@/components/game/BalloonGame";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Balloon Pop - Fun Casual Game</title>
        <meta name="description" content="Pop colorful balloons in this fun and addictive casual game. Test your reflexes and beat your high score!" />
        <meta name="keywords" content="balloon game, pop balloons, casual game, mobile game, free game" />
      </Helmet>
      {/* <TabNavigation /> */}
      <BalloonGame />
    </>
  );
};

export default Index;
