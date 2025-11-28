import { Button } from "@/components/ui/button";
import { affiliateLinks } from "@/lib/affiliateLinks";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            স্বাগতম <span className="text-gradient">TekkaBuzz</span>-এ
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            বাংলাদেশের সেরা অনলাইন ক্যাসিনো এবং স্পোর্টস বেটিং প্ল্যাটফর্ম। রোমাঞ্চকর গেমস, বিশাল বোনাস এবং দ্রুত উইথড্র!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="brand" size="lg" asChild className="animate-pulse-glow">
              <a href={affiliateLinks.signup} target="_blank" rel="noopener noreferrer">
                এখনই জয়েন করুন
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={affiliateLinks.main} target="_blank" rel="noopener noreferrer">
                আরও জানুন
              </a>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">৫০,০০০+</div>
              <div className="text-sm text-muted-foreground">সক্রিয় ব্যবহারকারী</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">১০০%</div>
              <div className="text-sm text-muted-foreground">স্বাগত বোনাস</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">২৪/৭</div>
              <div className="text-sm text-muted-foreground">সাপোর্ট</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
