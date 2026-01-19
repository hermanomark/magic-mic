import { X } from "lucide-react";

interface Card {
  id?: string;
  playerName: string;
  teamName: string;
  series: string;
  yearReleased: number;
  ebayUrl: string;
  imageUrl: string;
  stock: number;
  price: number;
  forSale: boolean;
  user: string;
}

interface CardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardData: Card) => void;
  card?: Card | null;
  formData: Card;
  setForm: (data: Card) => void;
}

const CardFormModal = ({ isOpen, onClose, onSubmit, card, formData, setForm }: CardFormModalProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : type === 'select-one' ? value === 'true' : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{card ? 'Update Card' : 'Add New Card'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Player Name</label>
              <input 
                type="text" 
                name="playerName"
                value={formData.playerName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Team Name</label>
              <input 
                type="text" 
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Series</label>
              <input 
                type="text" 
                name="series"
                value={formData.series}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Year Released</label>
              <input 
                type="number" 
                name="yearReleased"
                value={formData.yearReleased}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">eBay URL</label>
              <input 
                type="text" 
                name="ebayUrl"
                value={formData.ebayUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
              <input 
                type="text" 
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Stock</label>
              <input 
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Price</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">For Sale</label>
              <select 
                name="forSale"
                value={formData.forSale.toString()}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button 
              type="submit" 
              className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 cursor-pointer"
            >
              {card ? 'Update' : 'Add'} Card
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardFormModal;