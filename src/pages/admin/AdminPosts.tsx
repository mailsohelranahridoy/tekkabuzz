import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, remove } from "firebase/database";
import { auth, database } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  title: string;
  featuredImage: string;
}

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin/login");
      }
    });

    const postsRef = ref(database, "posts");
    const unsubPosts = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postList = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Post, "id">),
        }));
        setPosts(postList);
      } else {
        setPosts([]);
      }
      setLoading(false);
    });

    return () => {
      unsubAuth();
      unsubPosts();
    };
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (!confirm("এই পোস্ট মুছে ফেলতে চান?")) return;

    try {
      await remove(ref(database, `posts/${id}`));
      toast({
        title: "সফল!",
        description: "পোস্ট মুছে ফেলা হয়েছে",
      });
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "পোস্ট মুছতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-primary">সব পোস্ট</h1>
          </div>
          <Link to="/admin/posts/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              নতুন পোস্ট
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">কোনো পোস্ট নেই</p>
            <Link to="/admin/posts/create">
              <Button>প্রথম পোস্ট তৈরি করুন</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 line-clamp-2">{post.title}</h3>
                  <div className="flex gap-2">
                    <Link to={`/admin/posts/edit/${post.id}`} className="flex-1">
                      <Button variant="outline" className="w-full" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        এডিট
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPosts;
