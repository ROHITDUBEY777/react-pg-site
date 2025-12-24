import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Key, Lock, ArrowLeft, CheckCircle, User } from "lucide-react";

type Step = 1 | 2 | 3;

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate sending code (in production, this would call an API)
    setTimeout(() => {
      toast({
        title: "Code Sent!",
        description: `A 6-digit reset code has been sent to ${email}. (Demo: use any 6-digit code like 123456)`,
      });
      setStep(2);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Demo: Accept any 6-digit code
    if (code.length === 6) {
      setTimeout(() => {
        toast({
          title: "Code Verified!",
          description: "You can now set a new password.",
        });
        setStep(3);
        setIsLoading(false);
      }, 1000);
    } else {
      setError("Please enter a valid 6-digit code.");
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Password Reset Successful!",
        description: "You can now login with your new password.",
      });
      setIsLoading(false);
      // Redirect to login after success
      window.location.href = "/login";
    }, 1500);
  };

  const StepIndicator = ({ stepNum, label, icon: Icon }: { stepNum: number; label: string; icon: typeof Mail }) => (
    <div className={`flex flex-col items-center ${step >= stepNum ? "text-primary" : "text-muted-foreground"}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
        step >= stepNum 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted text-muted-foreground"
      }`}>
        {step > stepNum ? <CheckCircle className="w-5 h-5" /> : <span className="font-bold">{stepNum}</span>}
      </div>
      <span className="text-sm font-medium hidden sm:block">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex justify-center items-center p-5">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-8 text-center">
          <div className="w-20 h-20 bg-background/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Password Reset</h1>
          <p className="opacity-90">🔐 Reset your password securely in 3 steps</p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center items-center gap-4 sm:gap-8 py-6 px-4 bg-muted/30">
          <StepIndicator stepNum={1} label="Email" icon={Mail} />
          <div className={`h-0.5 w-8 sm:w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <StepIndicator stepNum={2} label="Verify" icon={Key} />
          <div className={`h-0.5 w-8 sm:w-12 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
          <StepIndicator stepNum={3} label="Reset" icon={Lock} />
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 border-l-4 border-destructive text-sm">
              ❌ {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendCode}>
              <p className="text-muted-foreground mb-6 text-center">
                📧 Enter your email to receive a reset code.
              </p>
              <div className="mb-6">
                <label className="block mb-2 text-foreground font-semibold text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Code →"}
              </Button>
            </form>
          )}

          {/* Step 2: Verify Code */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <p className="text-muted-foreground mb-6 text-center">
                ✉️ Enter the reset code sent to your email.
              </p>
              <div className="mb-6">
                <label className="block mb-2 text-foreground font-semibold text-sm">
                  Reset Code
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="pl-10 text-center tracking-widest font-mono text-lg"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Code →"}
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full mt-3 text-primary hover:underline text-sm font-medium"
              >
                ← Back
              </button>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <p className="text-muted-foreground mb-6 text-center">
                🔑 Set a new secure password.
              </p>
              <div className="mb-5">
                <label className="block mb-2 text-foreground font-semibold text-sm">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-foreground font-semibold text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password ✓"}
              </Button>
            </form>
          )}

          <div className="text-center pt-6 border-t border-border mt-6">
            <Link to="/login" className="text-primary hover:underline font-semibold inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
