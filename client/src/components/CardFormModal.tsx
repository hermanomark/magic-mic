import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { type CardType, type CardFormValues } from "@/types/Card";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Spinner } from "./ui/Spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/Select";
import { uploadImage } from "@/services/upload";

interface CardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardData: CardFormValues) => void;
  card?: CardType | null;
  formData: CardFormValues;
  setForm: (data: CardFormValues) => void;
}

const CardFormModal = ({ isOpen, onClose, onSubmit, card, formData, setForm }: CardFormModalProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [formData.imageUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : type === 'select-one' ? value === 'true' : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({
      ...formData,
      [name]: value === 'true'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setForm({ ...formData, imageUrl: url });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background text-foreground rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{card ? 'Update Card' : 'Add New Card'}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <Label className="block text-foreground font-semibold mb-2">Player Name</Label>
              <Input
                type="text"
                name="playerName"
                value={formData.playerName}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label className="block text-foreground font-semibold mb-2">Team Name</Label>
              <Input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label className="block text-foreground font-semibold mb-2">Series</Label>
              <Input
                type="text"
                name="series"
                value={formData.series}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label className="block text-foreground font-semibold mb-2">Year Released</Label>
              <Input
                type="number"
                name="yearReleased"
                value={formData.yearReleased}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <Label className="block text-foreground font-semibold mb-2">eBay URL</Label>
              <Input
                type="text"
                name="ebayUrl"
                value={formData.ebayUrl}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="mb-4 md:col-span-2">
              <Label className="block text-foreground font-semibold mb-2">Image Upload</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="w-full cursor-pointer"
                />
                {isUploading && <Spinner />}
              </div>
              <div className="mt-2">
                {formData.imageUrl && (
                  <div className="flex items-start gap-2">
                    {imgError ? (
                      <div className="mt-2 h-32 w-24 rounded border border-border flex items-center justify-center bg-muted text-muted-foreground text-xs text-center p-2">
                        No preview available
                      </div>
                    ) : (
                      <img
                        src={formData.imageUrl}
                        alt="Card preview"
                        className="h-32 w-auto rounded object-contain border border-border"
                        onError={() => setImgError(true)}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setForm({ ...formData, imageUrl: '' })}
                      className="text-muted-foreground hover:text-destructive cursor-pointer"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="mb-4 md:col-span-2 hidden">
              <Label className="block text-foreground font-semibold mb-2">Image URL</Label>
              <Input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full"
              />
            </div> */}
            <div className="mb-4">
              <Label className="block text-foreground font-semibold mb-2">Stock</Label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label className="block text-foreground font-semibold mb-2">Price</Label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                required
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label className="block text-foreground font-semibold mb-2">For Sale</Label>
              <Select
                value={formData.forSale.toString()}
                onValueChange={(value) => handleSelectChange('forSale', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="For Sale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button
              type="submit"
              disabled={isUploading}
              className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 cursor-pointer"
            >
              {card ? 'Update' : 'Add'} Card
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="bg-muted text-muted-foreground font-semibold py-2 px-4 rounded-lg hover:bg-muted/70 transition-colors duration-300 cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardFormModal;