import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";

interface Promotion {
  id: string;
  title: string;
  featuredImage: string;
  content: string;
  affiliateLink: string;
}

const Promotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promotionsRef = ref(database, "posts");
    const unsubscribe = onValue(promotionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const promotionsList = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Promotion, "id">),
        }));
        setPromotions(promotionsList);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-muted-foreground">লোড হচ্ছে...</p>
          </div>
        </div>
      </section>
    );
  }

  if (promotions.length === 0) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary">এক্সক্লুসিভ প্রমোশন</h2>
            <p className="text-muted-foreground">কোনো প্রমোশন পাওয়া যায়নি</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">এক্সক্লুসিভ প্রমোশন</h2>
          <p className="text-muted-foreground">সেরা অফার এবং বোনাস পান</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <Link key={promo.id} to={`/post/${promo.id}`}>
              <Card className="overflow-hidden hover:border-primary/50 transition-colors group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={promo.featuredImage}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {promo.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
