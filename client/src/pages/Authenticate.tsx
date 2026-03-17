import { authUser } from "@/services/auth";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const Authenticate = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-bold mb-4 text-primary text-center"
    >
      Login
    </motion.h1>
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className='max-w-md mx-auto p-6 gap-2 overflow-hidden transition-all duration-300 h-full rounded-xl border-2 border-primary shadow-[-8px_8px_0px_0px_var(--color-primary)] hover:shadow-[-12px_12px_0px_0px_var(--color-primary)]'>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Label htmlFor="username" className="font-semibold">Username</Label>
            <Input type="text" id="username" name="username" className="mt-2" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="font-semibold">Password</Label>
            <Input type="password" id="password" name="password" className="mt-2" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </Card>
    </motion.div>
  </div>;
};

export default Authenticate;