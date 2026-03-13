import { useState } from "react";
import { getUserProfile } from "@/services/users";
import { getAllCards, addNewCard, updateCard, deleteCard } from "@/services/cards";
import { Trash2, SquarePen, LogOut, SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardFormModal from "@/components/CardFormModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import TablePagination from "@/components/TablePagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


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
  const queryClient = useQueryClient();
  const username = localStorage.getItem('authUsername') || '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const initializeCard: Card = {
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
  };

  const [formData, setFormData] = useState<Card>({ ...initializeCard });

  const resetForm = () => {
    setFormData({ ...initializeCard });
    setSelectedCard(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const newCardMutation = useMutation({
    mutationFn: addNewCard,
    onSuccess: (newCard) => {
      const cards = queryClient.getQueryData<Card[]>(['cards']) || [];
      queryClient.setQueryData(['cards'], [...cards, newCard]);
      toast.success(`Card "${newCard.playerName}" added successfully.`);
    },
    onError(error: string) {
      toast.error(error || "Failed to add new card.");
    }
  });

  const updateCardMutation = useMutation({
    mutationFn: updateCard,
    onSuccess: (updatedCard) => {
      queryClient.setQueryData<Card[]>(['cards'], (oldCards) => {
        if (!oldCards) return [];
        return oldCards.map(card => card.id === updatedCard.id ? updatedCard : card);
      });
      toast.success(`Card "${updatedCard.playerName}" updated successfully.`);
    },
    onError(error: string) {
      toast.error(error || "Failed to update the card.");
    }
  });

  const deleteCardMutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: (_data, cardId) => {
      queryClient.setQueryData<Card[]>(['cards'], (oldCards) => {
        if (!oldCards) return [];
        return oldCards.filter(card => card.id !== cardId);
      });
      toast.success("Card deleted successfully.");
    },
    onError(error: string) {
      toast.error(error || "Failed to delete the card.");
    }
  });

  const handleAddCard = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditCard = (card: Card) => {
    setSelectedCard(card);
    setFormData(card);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (cardData: Card) => {
    if (selectedCard && selectedCard.id) {
      updateCardMutation.mutate({ ...cardData, id: selectedCard.id });
    } else {
      newCardMutation.mutate(cardData);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteCard = (cardId: string) => {
    setCardToDelete(cardId);
  };

  const confirmDelete = () => {
    if (cardToDelete) {
      deleteCardMutation.mutate(cardToDelete);
      setCardToDelete(null);
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('authUsername');
      localStorage.removeItem('authToken');
      navigate('/login');
    }

    return;
  }

  const resultUser = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getUserProfile(username),
    enabled: !!username,
    refetchOnWindowFocus: false,
  });

  const resultCards = useQuery({
    queryKey: ['cards'],
    queryFn: getAllCards,
    refetchOnWindowFocus: false,
  });

  const cards = resultCards.data || [];
  const user = resultUser.data || null;

  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cards.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
        <div className="flex items-center">
          {user?.username && <span className="mr-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{user.username}</span>}
          <button
            onClick={() => handleLogout()}
            className="text-foreground hover:opacity-70 transition-opacity duration-300 cursor-pointer flex items-center gap-2 text-sm"
          >
            <LogOut size={10} /> Logout
          </button>
        </div>

      </div>

      <p>Welcome {user?.name}. Here you can manage the application.</p>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-primary">Manage Cards</h2>
          <button
            onClick={handleAddCard}
            className="hover:opacity-70 transition-opacity duration-300 cursor-pointer flex items-center gap-2 text-primary"
          >
            <SquarePlus size={20} /> Add New Card
          </button>
        </div>
        <table className="min-w-full border border-gray-300">
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
            {currentCards.map((card: Card) => (
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
                  <button onClick={() => card.id && handleDeleteCard(card.id)} className="text-red-500 hover:opacity-70 transition-opacity cursor-pointer"><Trash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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

      <AlertDialog open={!!cardToDelete} onOpenChange={(open) => !open && setCardToDelete(null)}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete card?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this card. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" size="default" onClick={() => setCardToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} variant="destructive" size="default">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AdminDashboard;