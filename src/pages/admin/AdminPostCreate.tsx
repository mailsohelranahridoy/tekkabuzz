import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, push } from "firebase/database";
import { auth, database } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const AdminPostCreate = () => {
  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [content, setContent] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin/login");
      }
    });

    return () => unsubAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postsRef = ref(database, "posts");
      await push(postsRef, {
        title,
        featuredImage,
        content,
        affiliateLink,
        createdAt: Date.now(),
      });
      toast({
        title: "সফল!",
        description: "পোস্ট তৈরি হয়েছে",
      });
      navigate("/admin/posts");
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "পোস্ট তৈরি করতে সমস্যা হয়েছে",
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
          <Link to="/admin/posts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary ml-4">নতুন পোস্ট তৈরি</h1>
        </div>
      </header>

      <main className="container py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>পোস্ট তথ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">শিরোনাম</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="পোস্ট শিরোনাম"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">ফিচার্ড ছবি URL</label>
                <Input
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">অ্যাফিলিয়েট লিংক</label>
                <Input
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">কনটেন্ট (HTML সাপোর্টেড)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="পোস্ট কনটেন্ট লিখুন..."
                  className="w-full h-40 p-3 rounded-md border border-input bg-background text-foreground"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "তৈরি হচ্ছে..." : "পোস্ট তৈরি করুন"}
                </Button>
                <Link to="/admin/posts">
                  <Button type="button" variant="outline">
                    বাতিল
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPostCreate;
