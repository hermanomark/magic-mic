import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/users";
import { getAllCards, addNewCard, updateCard, deleteCard } from "@/services/cards";
import { Trash2, SquarePen } from "lucide-react";

interface Profile {
  username: string;
  name: string;
}

interface Card {
  id: string;
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
  const username = localStorage.getItem('authUsername') || '';
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cards, setCards] = useState<Card[]>([]);

  const handleDeleteCard = async (cardId: string) => {
    try {
      const confirmDialog = window.confirm("Are you sure you want to delete this card?");
      if (!confirmDialog) return;
      console.log(cardId)
      await deleteCard(cardId);
      setCards(cards.filter(card => card.id !== cardId));
      alert("Card deleted successfully.");
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  }

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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p>Welcome {profile?.name}. Here you can manage the application.</p>

      {/* My form for add/update card here */}
      <form className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Add / Update Card</h2>
        {/* Form fields for card details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Player Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Team Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          {/* Additional fields for series, yearReleased, ebayUrl, imageUrl, stock, price, forSale */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Series</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Year Released</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">eBay URL</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Stock</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">For Sale</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300">
          Submit
        </button>
      </form>

      {/* table here to display cards */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Manage Cards</h2>
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
                  <button className="text-blue-500 hover:underline mr-4"><SquarePen /></button>
                  <button onClick={() => handleDeleteCard(card.id)} className="text-red-500 hover:underline cursor-pointer"><Trash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination here */}


      </div>    
    </div>
  )
}

export default AdminDashboard;