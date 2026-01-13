import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-6xl font-bold mb-4 text-primary">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground">The page you are looking for does not exist.</p>
      <Link to="/" className="text-primary underline">Homepage</Link>.
    </div>
  );
};

export default NotFound;