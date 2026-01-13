import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { ExternalLink } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';

const Shop = () => {
  const itemsPerPage = 10;
  const totalItems = 4; // Total number of shop items
  const [currentPage, setCurrentPage] = useState(1);

  const items = Array.from({ length: totalItems }, (_, index) => ({
    id: index + 1,
    name: `Baseball Card ${index + 1}`,
    description: `Rare collectible card featuring legendary player`,
    price: (Math.random() * 200 + 20).toFixed(2), // Random price between $20-$220
    image: '/sample-baseball-card-3.avif', // Placeholder image
    ebayLink: `https://www.ebay.com/sch/i.html?_nkw=baseball+card+${index + 1}`, // Placeholder eBay link
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyClick = (ebayLink: string) => {
    window.open(ebayLink, '_blank', 'noopener,noreferrer');
  };

  const pageKey = `page-${currentPage}`

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
        {currentItems.map((item) => (
          <motion.div 
            key={item.id} 
            variants={fadeInUp}
            className="w-full"
          >
            <Card className='py-2 gap-2 overflow-hidden transition-all duration-300 h-full rounded-xl border-primary shadow-[-8px_8px_0px_0px_var(--color-primary)] hover:shadow-[-12px_12px_0px_0px_var(--color-primary)] bg-white flex flex-col'>
              <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              <div className="px-4 py-2 flex flex-col grow">
                <h2 className="text-md font-semibold text-primary mb-2">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-3 grow">{item.description}</p>
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-primary mb-3">${item.price}</p>
                  <Button
                    onClick={() => handleBuyClick(item.ebayLink)}
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

      {totalPages > 1 && (
        <Pagination className="mt-24">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Shop;