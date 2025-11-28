import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Post {
  title: string;
  featuredImage: string;
  content: string;
  affiliateLink: string;
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const postRef = ref(database, `posts/${id}`);
      const snapshot = await get(postRef);
      if (snapshot.exists()) {
        setPost(snapshot.val());
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <p className="text-center text-muted-foreground">লোড হচ্ছে...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <p className="text-center text-muted-foreground">পোস্ট পাওয়া যায়নি</p>
          <div className="text-center mt-4">
            <Button asChild>
              <Link to="/">হোমে ফিরে যান</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="container py-8 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ফিরে যান
          </Link>
          
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-lg mb-6"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            {post.title}
          </h1>
          
          <div 
            className="prose prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="text-center">
            <Button variant="brand" size="lg" asChild className="animate-pulse-glow">
              <a href={post.affiliateLink} target="_blank" rel="noopener noreferrer">
                এখনই অফার নিন
              </a>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
