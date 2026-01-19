import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/users";
import { getAllCards, addNewCard, updateCard, deleteCard } from "@/services/cards";
import { Trash2, SquarePen, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardFormModal from "@/components/CardFormModal";

interface Profile {
  username: string;
  name: string;
}

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
  forSale: boolean
  user: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('authUsername') || '';
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [formData, setFormData] = useState<Card>({
    playerName: '',
    teamName: '',
    series: '',
    yearReleased: new Date().getFullYear(),
    ebayUrl: '',
    imageUrl: '',
    stock: 0,
    price: 0,
    forSale: true,
    user: username
  });

  const handleDeleteCard = async (cardId: string) => {
    try {
      if (confirm("Are you sure you want to delete this card?")) {
        await deleteCard(cardId);
        setCards(cards.filter(card => card.id !== cardId));
        alert("Card deleted successfully.");
      }

      return;
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("Failed to delete card.");
    }
  }

  const handleAddCard = () => {
    setSelectedCard(null);
    setFormData({
      playerName: '',
      teamName: '',
      series: '',
      yearReleased: new Date().getFullYear(),
      ebayUrl: '',
      imageUrl: '',
      stock: 0,
      price: 0,
      forSale: true,
      user: username
    });
    setIsModalOpen(true);
  };

  const handleEditCard = (card: Card) => {
    setSelectedCard(card);
    setFormData(card);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (cardData: Card) => {
    try {
      if (selectedCard && selectedCard.id) {
        // Update existing card
        const updatedCard = await updateCard(selectedCard.id, cardData);
        setCards(cards.map(card => card.id === selectedCard.id ? updatedCard : card));
        alert("Card updated successfully.");
      } else {
        // Add new card
        const newCard = await addNewCard(cardData);
        setCards([...cards, newCard]);
        alert("Card added successfully.");
      }

      setFormData({
        playerName: '',
        teamName: '',
        series: '',
        yearReleased: new Date().getFullYear(),
        ebayUrl: '',
        imageUrl: '',
        stock: 0,
        price: 0,
        forSale: true,
        user: username
      });

      setIsModalOpen(false);
      setSelectedCard(null);
    } catch (error) {
      console.error("Error saving card:", error);
      alert("Failed to save card.");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile(username);
        setProfile(profile);
        console.log("Admin User Profile:", profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    fetchUserProfile();
  }, [username]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('authUsername');
      localStorage.removeItem('authToken');
      navigate('/login');
    }

    return;
  }

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsData = await getAllCards();
        setCards(cardsData);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }
    fetchCards();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <button
          onClick={() => handleLogout()}
          className="bg-gray-400 py-1 px-2 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
        >
          <LogOut size={20} />
        </button>
      </div>

      <p>Welcome {profile?.name}. Here you can manage the application.</p>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Manage Cards</h2>
          <button
            onClick={handleAddCard}
            className="bg-green-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Plus size={20} />
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Player Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Team Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Series</th>
              <th className="py-2 px-4 border-b border-gray-300">Year Released</th>
              <th className="py-2 px-4 border-b border-gray-300">Price</th>
              <th className="py-2 px-4 border-b border-gray-300">Stock</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id}>
                <td className="py-2 px-4 border-b border-gray-300">{card.playerName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{card.teamName}</td>
                <td className="py-2 px-4 border-b border-gray-300">{card.series}</td>
                <td className="py-2 px-4 border-b border-gray-300">{card.yearReleased}</td>
                <td className="py-2 px-4 border-b border-gray-300">${card.price}</td>
                <td className="py-2 px-4 border-b border-gray-300">{card.stock}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => handleEditCard(card)}
                    className="text-blue-500 hover:underline mr-4 cursor-pointer"
                  >
                    <SquarePen />
                  </button>
                  <button onClick={() => card.id && handleDeleteCard(card.id)} className="text-red-500 hover:underline cursor-pointer"><Trash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CardFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCard(null);
        }}
        onSubmit={handleModalSubmit}
        card={selectedCard}
        setForm={setFormData}
        formData={formData}
      />
    </div>
  )
}

export default AdminDashboard;