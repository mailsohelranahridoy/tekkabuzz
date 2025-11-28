import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GameTypes from "@/components/GameTypes";
import Promotions from "@/components/Promotions";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <GameTypes />
        <Promotions />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
