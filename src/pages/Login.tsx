import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, ArrowLeft, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Accept any email with password "student123" for demo
      if (email && password === "student123") {
        // Create a simple token
        const token = btoa(JSON.stringify({
          email: email,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
        }));

        localStorage.setItem("studentToken", token);
        localStorage.setItem("studentEmail", email);

        if (rememberMe) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          localStorage.setItem("studentTokenExpiration", expirationDate.getTime().toString());
        }

        toast({
          title: "Login Successful!",
          description: "Redirecting to book rooms...",
        });

        setTimeout(() => {
          navigate("/book-room");
        }, 1500);
      } else {
        setError("Invalid password. Use 'student123' for demo.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex justify-center items-center p-5">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-8 text-center">
          <div className="w-20 h-20 bg-background/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mb-2">AR PG Student</h1>
          <p className="opacity-90">Student Portal</p>
          <div className="inline-block bg-background/20 px-4 py-2 rounded-full mt-4 text-sm">
            🔐 Student Login
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          {/* Demo Info */}
          <div className="bg-warning/20 border border-warning/50 p-4 rounded-lg mb-6 text-sm text-warning-foreground">
            <strong className="block mb-1">📝 Demo Credentials:</strong>
            Email: any valid email<br />
            Password: student123
          </div>

          {/* Info Box */}
          <div className="bg-info/20 border-l-4 border-info p-4 rounded-lg mb-6 text-sm text-info-foreground">
            <strong className="block mb-1">ℹ️ Information:</strong>
            Login to access your booking details and account information.
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 border-l-4 border-destructive text-sm">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block mb-2 text-foreground font-semibold text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="student@arpg.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-foreground font-semibold text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  Remember me for 7 days
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="hero"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "🔓 Login to Portal"}
            </Button>
          </form>

          <div className="text-center pt-6 border-t border-border mt-6">
            <Link to="/" className="text-primary hover:underline font-semibold inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
