import { Link } from "react-router-dom";
import { affiliateLinks } from "@/lib/affiliateLinks";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-gradient">
              TEKKABUZZ
            </Link>
            <p className="text-sm text-muted-foreground">
              বাংলাদেশের সেরা অনলাইন ক্যাসিনো এবং স্পোর্টস বেটিং প্ল্যাটফর্ম।
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-primary">গেমস</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={affiliateLinks.casino} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ক্যাসিনো</a></li>
              <li><a href={affiliateLinks.slots} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">স্লটস</a></li>
              <li><a href={affiliateLinks.sports} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">স্পোর্টস</a></li>
              <li><a href={affiliateLinks.crash} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ক্র্যাশ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-primary">আরও গেমস</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={affiliateLinks.table} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">টেবিল গেমস</a></li>
              <li><a href={affiliateLinks.fishing} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ফিশিং</a></li>
              <li><a href={affiliateLinks.lottery} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">লটারি</a></li>
              <li><a href={affiliateLinks.arcade} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">আর্কেড</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-primary">সাপোর্ট</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={affiliateLinks.vip} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">VIP প্রোগ্রাম</a></li>
              <li><a href={affiliateLinks.refercode} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">রেফারেল</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">যোগাযোগ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TekkaBuzz. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="mt-2">18+ শুধুমাত্র। দায়িত্বশীল জুয়া খেলুন।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
