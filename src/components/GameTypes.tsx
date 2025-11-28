import { affiliateLinks } from "@/lib/affiliateLinks";

const gameTypes = [
  { name: "ক্যাসিনো", icon: "🎰", link: affiliateLinks.casino },
  { name: "স্পোর্টস", icon: "⚽", link: affiliateLinks.sports },
  { name: "ক্র্যাশ", icon: "📈", link: affiliateLinks.crash },
  { name: "স্লটস", icon: "🎲", link: affiliateLinks.slots },
  { name: "টেবিল গেমস", icon: "🃏", link: affiliateLinks.table },
  { name: "ফিশিং", icon: "🐟", link: affiliateLinks.fishing },
  { name: "লটারি", icon: "🎟️", link: affiliateLinks.lottery },
  { name: "আর্কেড", icon: "🕹️", link: affiliateLinks.arcade },
];

const GameTypes = () => {
  return (
    <section className="py-16 bg-card/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">গেম টাইপস</h2>
          <p className="text-muted-foreground">আপনার পছন্দের গেম খুঁজে নিন এবং জিতুন বড়</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {gameTypes.map((game) => (
            <a
              key={game.name}
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
            >
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {game.icon}
              </span>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {game.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameTypes;
