import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { ExternalLink } from 'lucide-react';
import TablePagination from '@/components/TablePagination';
import { Button } from '@/components/ui/Button';
import { getAllCards } from '@/services/cards';
import { useQuery } from '@tanstack/react-query';
import { type CardType } from '@/types/Card';

const Shop = () => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyClick = (ebayUrl: string) => {
    window.open(ebayUrl, '_blank', 'noopener,noreferrer');
  };


  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const resultCards = useQuery({
    queryKey: ['cards'],
    queryFn: getAllCards,
    refetchOnWindowFocus: false,
  });

  const shopCards = resultCards.data ? resultCards.data.filter((card: CardType) => card.forSale) : [];

  const totalItems = shopCards.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shopCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageKey = `page-${currentPage}-${totalItems}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold mb-6 text-primary text-center"
      >
        Shop
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-muted-foreground mb-8 text-center"
      >
        Browse and purchase authenticated baseball cards. All items link directly to eBay for secure transactions.
      </motion.p>
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        key={pageKey}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {currentItems.map((card: CardType) => (
          <motion.div
            key={card.id}
            variants={fadeInUp}
            className="w-full"
          >
            <Card className='py-2 pt-0 gap-2 overflow-hidden transition-all duration-300 h-full rounded-xl border-primary shadow-[-8px_8px_0px_0px_var(--color-primary)] hover:shadow-[-12px_12px_0px_0px_var(--color-primary)]  flex flex-col'>
              <img src="/aaron-judge.png" alt={card.playerName} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />

              <div className="px-4 py-2 flex flex-col grow">
                <h2 className="text-md font-semibold text-primary mb-2">{card.playerName}</h2>
                <p className="text-primary text-sm mb-3 grow">{card.teamName} - {card.series} ({card.yearReleased})</p>
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-primary mb-3">${card.price}</p>
                  <Button
                    onClick={() => handleBuyClick(card.ebayUrl)}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Buy on eBay
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Shop;