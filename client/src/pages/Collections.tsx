import { useState } from 'react';
import { getAllCards } from '@/services/cards';
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import TablePagination from '@/components/TablePagination';
import { type CardType } from '@/types/Card';

const Collections = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

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

  const resultCards = useQuery({
    queryKey: ['cards'],
    queryFn: getAllCards,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const collectionCards = resultCards.data ? resultCards.data.filter((card: CardType) => !card.forSale) : [];

  const totalItems = collectionCards.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = collectionCards.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageKey = `page-${currentPage}-${totalItems}`

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-primary"
      >
        Magic Mic Collections
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-muted-foreground mb-8"
      >
        Discover curated baseball card collections from rookie phenoms to legendary sets and team favorites.
      </motion.p>
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        key={pageKey}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        {currentItems.map((card: CardType) => (
          <motion.div
            key={card.id}
            variants={fadeInUp}
            className="w-full"
          >
            <Card className='py-2 pt-0 gap-2 overflow-hidden transition-all duration-300 h-full rounded-xl border-primary shadow-[-8px_8px_0px_0px_var(--color-primary)] hover:shadow-[-12px_12px_0px_0px_var(--color-primary)]'>
              <img
                src={card.imageUrl}
                alt={card.playerName}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              <div className="px-4 py-2">
                <h2 className="text-md font-semibold text-primary mb-2">{card.playerName}</h2>
                <p className="text-primary text-sm">{card.teamName} - {card.series} ({card.yearReleased})</p>
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

export default Collections;