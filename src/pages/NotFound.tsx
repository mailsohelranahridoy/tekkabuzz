import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">পেজ পাওয়া যায়নি</p>
        <Button asChild>
          <Link to="/">হোমে ফিরে যান</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
