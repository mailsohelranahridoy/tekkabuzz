import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, database } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Database } from "lucide-react";
import { affiliateLinks } from "@/lib/affiliateLinks";

const defaultPosts = [
  {
    title: "আনলিমিটেড ক্যাশব্যাক অফার",
    featuredImage: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=800",
    content: "<p>প্রতিদিন আনলিমিটেড ক্যাশব্যাক পান! TekkaBuzz-এ খেলুন এবং প্রতিটি বাজিতে ক্যাশব্যাক উপভোগ করুন।</p><p>কোনো সীমাবদ্ধতা নেই, যত খেলবেন তত ক্যাশব্যাক পাবেন!</p>",
    affiliateLink: affiliateLinks.main,
  },
  {
    title: "ক্র্যাশ গেম বোনাস - ২০% এক্সট্রা",
    featuredImage: "https://images.unsplash.com/photo-1611329857570-f02f340e7378?w=800",
    content: "<p>ক্র্যাশ গেমে এখন ২০% এক্সট্রা বোনাস! রোমাঞ্চকর ক্র্যাশ গেমে অংশ নিন এবং বড় জিতুন।</p>",
    affiliateLink: affiliateLinks.crash,
  },
  {
    title: "১০০% স্বাগত বোনাস - নতুন সদস্যদের জন্য",
    featuredImage: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800",
    content: "<p>নতুন সদস্যদের জন্য ১০০% স্বাগত বোনাস! প্রথম ডিপোজিটে ডাবল বোনাস পান।</p><p>এখনই রেজিস্টার করুন এবং বোনাস নিন!</p>",
    affiliateLink: affiliateLinks.signup,
  },
  {
    title: "লাইভ ক্যাসিনো বোনাস",
    featuredImage: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800",
    content: "<p>লাইভ ক্যাসিনোতে এখন ১৫% এক্সট্রা বোনাস! রিয়েল ডিলারদের সাথে খেলুন।</p>",
    affiliateLink: affiliateLinks.casino,
  },
  {
    title: "স্পোর্টস বেটিং বোনাস",
    featuredImage: "https://images.unsplash.com/photo-1461896836934- voices?w=800",
    content: "<p>স্পোর্টস বেটিংয়ে ফ্রি বেট অফার! আপনার প্রিয় টিমে বাজি ধরুন।</p>",
    affiliateLink: affiliateLinks.sports,
  },
  {
    title: "স্লটস এবং ফিশিং বোনাস",
    featuredImage: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800",
    content: "<p>স্লটস এবং ফিশিং গেমে বিশেষ বোনাস! সেরা স্লট গেমগুলোতে ফ্রি স্পিন পান।</p>",
    affiliateLink: affiliateLinks.slots,
  },
  {
    title: "আল্ট্রা বোনাস রাশ",
    featuredImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    content: "<p>সীমিত সময়ের জন্য আল্ট্রা বোনাস রাশ! বিশাল বোনাস জিতুন।</p>",
    affiliateLink: affiliateLinks.main,
  },
  {
    title: "কুইজ কোয়েস্ট চ্যালেঞ্জ",
    featuredImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800",
    content: "<p>কুইজে অংশ নিন এবং পুরস্কার জিতুন! প্রতিদিন নতুন কুইজ।</p>",
    affiliateLink: affiliateLinks.main,
  },
  {
    title: "ফ্ল্যাশ উইন ফ্রেঞ্জি",
    featuredImage: "https://images.unsplash.com/photo-1533850477621-f0c9e5e3ca13?w=800",
    content: "<p>ফ্ল্যাশ উইন ইভেন্টে অংশ নিন! দ্রুত জিতুন বড় পুরস্কার।</p>",
    affiliateLink: affiliateLinks.main,
  },
  {
    title: "রেফারেল রিওয়ার্ড - বন্ধুদের আমন্ত্রণ করুন",
    featuredImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
    content: "<p>বন্ধুদের রেফার করুন এবং প্রতিটি রেফারেলে বোনাস পান! আনলিমিটেড রেফারেল বোনাস।</p>",
    affiliateLink: affiliateLinks.refercode,
  },
];

const AdminSeedData = () => {
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin/login");
      }
    });

    const checkData = async () => {
      const postsRef = ref(database, "posts");
      const snapshot = await get(postsRef);
      setHasData(snapshot.exists());
    };

    checkData();

    return () => unsubAuth();
  }, [navigate]);

  const handleSeed = async () => {
    setLoading(true);

    try {
      const postsRef = ref(database, "posts");
      const postsData: Record<string, typeof defaultPosts[0] & { createdAt: number }> = {};
      
      defaultPosts.forEach((post, index) => {
        postsData[`post_${index + 1}`] = {
          ...post,
          createdAt: Date.now() - index * 1000,
        };
      });

      await set(postsRef, postsData);
      
      toast({
        title: "সফল!",
        description: "ডিফল্ট ডাটা সিড করা হয়েছে",
      });
      setHasData(true);
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "ডাটা সিড করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center h-16">
          <Link to="/admin/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary ml-4">ডাটা সিড</h1>
        </div>
      </header>

      <main className="container py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              ডিফল্ট ডাটা সিড করুন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              এই অপশনটি ১০টি ডিফল্ট প্রমোশন পোস্ট তৈরি করবে। এটি শুধুমাত্র একবার চালানো উচিত।
            </p>
            
            {hasData && (
              <p className="text-yellow-500 text-sm">
                সতর্কতা: ডাটাবেসে ইতিমধ্যে পোস্ট আছে। সিড করলে পুরানো ডাটা মুছে যাবে।
              </p>
            )}

            <Button onClick={handleSeed} disabled={loading}>
              {loading ? "সিড হচ্ছে..." : "ডিফল্ট ডাটা সিড করুন"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminSeedData;
