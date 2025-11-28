import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, LogOut, Database } from "lucide-react";

const AdminDashboard = () => {
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin/login");
      }
    });

    const postsRef = ref(database, "posts");
    const unsubPosts = onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        setPostCount(Object.keys(snapshot.val()).length);
      }
      setLoading(false);
    });

    return () => {
      unsubAuth();
      unsubPosts();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
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
          <h1 className="text-xl font-bold text-primary">অ্যাডমিন প্যানেল</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            লগআউট
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                মোট পোস্ট
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{postCount}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/posts">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  সব পোস্ট দেখুন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">সব পোস্ট দেখুন এবং ম্যানেজ করুন</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/posts/create">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  নতুন পোস্ট তৈরি
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">নতুন প্রমোশন বা ব্লগ পোস্ট তৈরি করুন</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/seed">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  ডাটা সিড
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">ডিফল্ট ডাটা সিড করুন</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
