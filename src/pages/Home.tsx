import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Sample featured cards data
  const featuredCards = [
    { id: 1, name: 'Mickey Mantle 1952', price: '$5,999', image: '/sample-baseball-card-1.webp' },
    { id: 2, name: 'Ken Griffey Jr. Rookie', price: '$1,299', image: '/sample-baseball-card-2.avif' },
    { id: 3, name: 'Babe Ruth 1933', price: '$8,499', image: '/sample-baseball-card-3.webp' },
  ];

  // Sample gallery images
  const galleryImages = [
    '/sample-baseball-card-1.webp',
    '/sample-baseball-card-2.avif',
    '/sample-baseball-card-3.webp',
    '/sample-baseball-card-1.webp',
    '/sample-baseball-card-2.avif',
    '/sample-baseball-card-3.webp',
    '/sample-baseball-card-1.webp',
    '/sample-baseball-card-2.avif',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center py-20">
        <div className="container mx-auto px-4 z-10 max-w-4xl relative">
          {/* Gradient Background Blur Effect */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#005A9C]/20 dark:bg-[#005A9C]/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EF3E42]/15 dark:bg-[#EF3E42]/25 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#005A9C]/10 dark:bg-[#005A9C]/20 rounded-full blur-3xl"></div>
          </div>

          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full mb-8"
            >
              <h1 className="text-5xl md:text-7xl mb-6 text-primary pb-4" style={{ fontFamily: "'Bungee Shade', sans-serif", letterSpacing: '0.05em' }}>
                MAGIC MIC
              </h1>
              <div className="relative rounded-full overflow-hidden shadow-2xl mx-auto flex w-48 h-48 md:w-64 md:h-64 border-4 border-[#005A9C]">
                <img
                  src="/src/assets/magic-mic-small.png"
                  alt="Magic Mic - Baseball Card Collector"
                  className="w-auto h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Your premier destination for authentic baseball cards. Curated with passion,
                delivered with excellence. Discover rare collectibles and timeless treasures
                from America's favorite pastime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4">
                <Button asChild size="lg" className="text-lg w-full sm:w-auto">
                  <Link to="/shop">
                    Explore Shop <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg w-full sm:w-auto">
                  <Link to="/collections">View Collection</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Cards Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-primary text-4xl md:text-5xl font-bold mb-4"
            >
              Featured Cards
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Handpicked gems from our collection. These rare finds won't last long!
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {featuredCards.map((card) => (
              <motion.div key={card.id} variants={fadeInUp}>
                <Card className="overflow-hidden transition-all duration-300 h-full rounded-xl border-primary shadow-[-8px_8px_0px_0px_var(--color-primary)] hover:shadow-[-12px_12px_0px_0px_var(--color-primary)] bg-white">
                  <div className="aspect-3/4 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">{card.name}</CardTitle>
                    <CardDescription className="text-xl font-semibold text-primary">
                      {card.price}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="cursor-pointer text-white w-full" variant="default">
                      Buy on Ebay
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link to="/shop">
                Browse All Cards <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Collection Gallery Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-primary text-4xl md:text-5xl font-bold mb-4"
            >
              My Collection
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              A glimpse into years of passionate collecting. Each card tells a story.
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}

              >
                <Card className="overflow-hidden transition-all duration-300 h-full rounded-xl border-primary shadow-[-8px_8px_0px_0px_var(--color-primary)] hover:shadow-[-12px_12px_0px_0px_var(--color-primary)] bg-white">
                  <div className="overflow-hidden">
                    <img
                      src={image}
                      alt={`Baseball card ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button asChild size="lg" className="text-lg">
              <Link to="/collections">
                Explore Full Collection <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* TikTok CTA Section */}
      <section className="py-24 bg-linear-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Follow Our Journey
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              Join thousands of collectors on TikTok! Watch card reveals, collection tours,
              and expert tips on building your baseball card collection.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base sm:text-xl px-6 sm:px-12 py-6 sm:py-8 h-auto hover:scale-105 transition-transform w-full sm:w-auto"
            >
              <a
                href="https://www.tiktok.com/@michermano03"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3"
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="TikTok"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="text-sm sm:text-base md:text-xl">Follow @michermano03 on TikTok</span>
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;