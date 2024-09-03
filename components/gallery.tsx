"use client";

import { useState, useMemo } from "react";
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
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import Image from "next/image";

export function Gallery() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Delicious Pasta Dish",
      description:
        "A mouthwatering pasta dish with homemade tomato sauce and fresh basil.",
      image: "/placeholder.svg",
      category: "food",
    },
    {
      id: 2,
      title: "Cozy Cafe Ambience",
      description:
        "Warm lighting and rustic decor create a charming and inviting atmosphere.",
      image: "/placeholder.svg",
      category: "ambience",
    },
    {
      id: 3,
      title: "Lively Birthday Party",
      description:
        "Vibrant decorations and a joyful crowd make this event a memorable celebration.",
      image: "/placeholder.svg",
      category: "events",
    },
    {
      id: 4,
      title: "Friendly Staff",
      description:
        "Attentive and welcoming staff provide exceptional customer service.",
      image: "/placeholder.svg",
      category: "staff",
    },
    {
      id: 5,
      title: "Gourmet Burger Delight",
      description:
        "A juicy burger with fresh toppings and a side of crispy fries.",
      image: "/placeholder.svg",
      category: "food",
    },
    {
      id: 6,
      title: "Elegant Dining Room",
      description:
        "Sophisticated decor and comfortable seating create an upscale dining experience.",
      image: "/placeholder.svg",
      category: "ambience",
    },
    {
      id: 7,
      title: "Corporate Networking Event",
      description:
        "A well-organized event with engaging speakers and opportunities to connect.",
      image: "/placeholder.svg",
      category: "events",
    },
    {
      id: 8,
      title: "Knowledgeable Bartenders",
      description:
        "Skilled bartenders who can craft unique cocktails and provide excellent service.",
      image: "/placeholder.svg",
      category: "staff",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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
    setIsModalOpen(true);
  };
  const handleSaveItem = (item) => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === item.id ? { ...i, ...item } : i)));
    } else {
      setItems([...items, { ...item, id: items.length + 1 }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };
  return (
    <div className='w-full max-w-6xl mx-auto px-4 md:px-6 py-8'>
      <header className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Gallery</h1>
        <Button onClick={handleAddItem}>Add New</Button>
      </header>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-4'>
            <Button
              variant={selectedCategory === "all" ? "primary" : "outline"}
              onClick={() => handleCategoryChange("all")}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "food" ? "primary" : "outline"}
              onClick={() => handleCategoryChange("food")}
            >
              Food
            </Button>
            <Button
              variant={selectedCategory === "ambience" ? "primary" : "outline"}
              onClick={() => handleCategoryChange("ambience")}
            >
              Ambience
            </Button>
            <Button
              variant={selectedCategory === "events" ? "primary" : "outline"}
              onClick={() => handleCategoryChange("events")}
            >
              Events
            </Button>
            <Button
              variant={selectedCategory === "staff" ? "primary" : "outline"}
              onClick={() => handleCategoryChange("staff")}
            >
              Staff
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className='bg-background rounded-lg overflow-hidden shadow-lg'
            >
              <Image
                src='/placeholder.svg'
                alt={item.title}
                width={400}
                height={300}
                className='w-full h-48 object-cover'
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className='p-4'>
                <h3 className='text-lg font-bold mb-2'>{item.title}</h3>
                <p className='text-muted-foreground line-clamp-2 mb-4'>
                  {item.description}
                </p>
                <div className='flex items-center justify-between'>
                  <Badge variant='outline' className='text-xs'>
                    {item.category}
                  </Badge>
                  <div className='flex items-center gap-2'>
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => handleEditItem(item)}
                    >
                      <PenIcon className='w-5 h-5' />
                      <span className='sr-only'>Edit</span>
                    </Button>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='text-red-500 hover:bg-red-500 hover:text-red-50'
                    >
                      <TrashIcon className='w-5 h-5' />
                      <span className='sr-only'>Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='sm:max-w-md'>
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
                image: formData.get("image"),
                category: formData.get("category"),
              };
              handleSaveItem(item);
            }}
          >
            <div className='grid gap-4 py-4'>
              <div>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  name='title'
                  defaultValue={editingItem?.title}
                  required
                />
              </div>
              <div>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name='description'
                  rows={3}
                  defaultValue={editingItem?.description}
                  required
                />
              </div>
              <div>
                <Label htmlFor='image'>Image URL</Label>
                <Input
                  id='image'
                  name='image'
                  type='url'
                  defaultValue={editingItem?.image}
                  required
                />
              </div>
              <div>
                <Label htmlFor='category'>Category</Label>
                <Select
                  id='category'
                  name='category'
                  defaultValue={editingItem?.category}
                >
                  <SelectContent>
                    <SelectItem value='food'>Food</SelectItem>
                    <SelectItem value='ambience'>Ambience</SelectItem>
                    <SelectItem value='events'>Events</SelectItem>
                    <SelectItem value='staff'>Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save</Button>
              <Button
                type='button'
                variant='outline'
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
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  );
}
