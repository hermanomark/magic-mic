import { authUser } from "@/services/auth";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { User, Lock, Eye, EyeOff } from "lucide-react";

const Authenticate = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = { username, password };
      const response = await authUser(userData);

      console.log('Login successful:', response);

      if (response.token) {
        console.log('Login successful:', response);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authUsername', response.username);

        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      }
    } catch (error) {
      console.log('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return <div className="container mx-auto px-4 py-8">

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className='max-w-md mx-auto p-6 gap-2 overflow-hidden transition-all duration-300 h-full rounded-xl border-2 border-primary shadow-[-8px_8px_0px_0px_var(--color-primary)] hover:shadow-[-12px_12px_0px_0px_var(--color-primary)]'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 mt-6 text-primary text-center"
        >
          Login to Admin Dashboard
        </motion.h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Label htmlFor="username" className="font-semibold">Username</Label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input type="text" id="username" name="username" className="pl-9" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            </div>
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="font-semibold">Password</Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input type={showPassword ? "text" : "password"} id="password" name="password" className="pl-9 pr-9" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4 cursor-pointer" /> : <Eye className="size-4 cursor-pointer" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Sign in
          </Button>
          <p className="text-xs text-center mt-6 mb-6 text-muted-foreground">By logging in, you agree to our <a href="/terms" target="_blank" className="text-primary underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-primary underline">Privacy Policy</a>.</p>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </Card>
    </motion.div>
  </div>;
};

export default Authenticate;