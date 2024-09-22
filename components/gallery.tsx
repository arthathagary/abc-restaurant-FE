"use client";
import React from "react";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface GalleryProps {
  isStaff?: boolean;
}

export function Gallery({ isStaff }: GalleryProps) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/gallery`);
        console.log("res,", response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") {
      return items;
    } else {
      return items.filter((item) => item.category === selectedCategory);
    }
  }, [items, selectedCategory]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveItem = async (item) => {
    console.log("Saving item:", item);
    const data = new FormData();
    data.append("image", formData.imageUrl);
    try {
      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imagePath = uploadResponse.data.file;

      const newItem = {
        ...item,
        imageUrl: imagePath,
      };


      if (editingItem) {
        console.log("Editing item:", newItem);
        setItems(items.map((i) => (i._id === item._id ? { ...i, ...newItem } : i)));
        console.log("editNewItem", items)
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${editingItem._id}`, newItem);
        location.reload();
        
      } else {
        setItems([...items, { ...newItem, id: items.length + 1 }]);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, newItem);

      }

      setIsEditing(false);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDeleteItem = async (itemId:string) => {
    console.log("Deleting item:", itemId);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gallery</h1>
        {isStaff && <Button onClick={handleAddItem}>Add New</Button>}
      </header>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => handleCategoryChange("all")}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "food" ? "default" : "outline"}
              onClick={() => handleCategoryChange("food")}
            >
              Food
            </Button>
            <Button
              variant={selectedCategory === "ambience" ? "default" : "outline"}
              onClick={() => handleCategoryChange("ambience")}
            >
              Ambience
            </Button>
            <Button
              variant={selectedCategory === "events" ? "default" : "outline"}
              onClick={() => handleCategoryChange("events")}
            >
              Events
            </Button>
            <Button
              variant={selectedCategory === "staff" ? "default" : "outline"}
              onClick={() => handleCategoryChange("staff")}
            >
              Staff
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-background rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + "/" + item.imageUrl}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  {isStaff && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditItem(item)}
                      >
                        <PenIcon className="w-5 h-5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-500 hover:bg-red-500 hover:text-red-50"
                        onClick={() => handleDeleteItem(item._id!)}
                      >
                        <TrashIcon className="w-5 h-5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const item = {
                title: formData.get("title"),
                description: formData.get("description"),
                imageUrl: formData.get("image"),
                category: formData.get("category"),
              };
              handleSaveItem(item);
            }}
          >
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingItem?.title}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={editingItem?.description}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.files[0] })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  name="category"
                  defaultValue={editingItem?.category}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Value" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="ambience">Ambience</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelModal}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}