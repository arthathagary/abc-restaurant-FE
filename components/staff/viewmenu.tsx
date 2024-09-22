"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import axios from "axios";

interface MenuItem {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image?: any;
  imageUrl?: string;
}

export function ViewMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [imagePath, setImagePath] = useState<any>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/menu`
        );
        // const itemsWithImages = await Promise.all(
        //   response.data.map(async (item: MenuItem) => {
        //     // const imageSrc = await fetchImage(item.imageUrl);
        //     return { ...item };
        //   })
        // );
        setMenuItems(response.data);

        return response.data;
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    // const fetchImage = async (imageName: string) => {
    //   try {
    //     const response = await axios.get(
    //       `${process.env.NEXT_PUBLIC_API_URL}/upload/${imageName}`,
    //       { responseType: "arraybuffer" }
    //     );
    //     const base64Image = Buffer.from(response.data, "binary").toString(
    //       "base64"
    //     );
    //     return `data:image/png;base64,${base64Image}`;
    //   } catch (error) {
    //     console.error("Error fetching image:", error);
    //     return null;
    //   }
    // };

    fetchMenuItems();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const[isFileBtnClicked, setIsFileBtnClicked] = useState(false);
  const [formData, setFormData] = useState<MenuItem>({
    _id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    available: true,
    imageUrl: "",
  });
  const [notification, setNotification] = useState(null);

  const handleDelete = (item: MenuItem) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      setMenuItems(menuItems.filter((item) => item._id !== itemToDelete._id));
    }
    try {
      console.log(itemToDelete, "itemToDelete");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/${itemToDelete?._id}`
      );
      setShowModal(false);
      // setNotification({
      //   type: "success",
      //   message: "Menu item deleted successfully.",
      // });
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }

    // const response = await axios.delete(
    //   `${process.env.NEXT_PUBLIC_API_URL}/menu/${itemToDelete?._id}`
    // );
    // setShowModal(false);
    // setNotification({
    //   type: "success",
    //   message: "Menu item deleted successfully.",
    // });
  };

  const handleEdit = (item: MenuItem) => {
    setFormData(item);
    console.log(item, "form edit");
    setIsEdit(true);
    setShowForm(true);
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", formData.image);

    try {
      const imgRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("image res --", imgRes.data);
      setImagePath(imgRes.data.filePath);
      const updatedMenuItems = menuItems.map((item) =>
        item._id === formData._id ? { ...item, ...formData } : item
      );

      if (formData._id === "") {
        const { _id, ...newMenuItem } = formData;
        newMenuItem.imageUrl = imgRes.data.file;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/menu`,
          newMenuItem
        );
        updatedMenuItems.push({ _id: response.data._id, ...newMenuItem });
      } else {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/menu/${formData._id}`,
          formData
        );
        //replace the existing menu item with the updated one
        updatedMenuItems[
          updatedMenuItems.findIndex((i) => i._id === response.data.id)
        ] = response.data;
      }

      setMenuItems(updatedMenuItems);
      setShowForm(false);
      setFormData({
        _id: "",
        name: "",
        description: "",
        price: 0,
        category: "",
        available: true,
        imageUrl: "",
      });
      setIsFileBtnClicked(false);

      // setNotification({
      //   type: "success",
      //   message:
      //     formData.id === 0
      //       ? "New menu item added successfully."
      //       : "Menu item updated successfully.",
      // });
    } catch (err) {
      console.error("image error --", err);
    }
    console.log("save function");

    // try {
    //   console.log(formData, "formData");
    //   const updatedMenuItems = menuItems.map((item) =>
    //     item._id === formData._id ? { ...item, ...formData } : item
    //   );

    //   if (formData._id === "") {
    //     const { _id, ...newMenuItem } = formData;
    //     newMenuItem.image = imagePath;
    //     const response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_API_URL}/menu`,
    //       newMenuItem
    //     );
    //     updatedMenuItems.push({ _id: response.data._id, ...newMenuItem });
    //   } else {
    //     const response = await axios.put(
    //       `${process.env.NEXT_PUBLIC_API_URL}/menu/${formData._id}`,
    //       formData
    //     );
    //     //replace the existing menu item with the updated one
    //     updatedMenuItems[
    //       updatedMenuItems.findIndex((i) => i._id === response.data.id)
    //     ] = response.data;
    //   }

    //   setMenuItems(updatedMenuItems);
    //   setShowForm(false);
    //   setFormData({
    //     _id: "",
    //     name: "",
    //     description: "",
    //     price: 0,
    //     category: "",
    //     available: true,
    //     image: "",
    //   });
    //   // setNotification({
    //   //   type: "success",
    //   //   message:
    //   //     formData.id === 0
    //   //       ? "New menu item added successfully."
    //   //       : "Menu item updated successfully.",
    //   // });
    // } catch (error) {
    //   console.error(error);
    //   // setNotification({
    //   //   type: "error",
    //   //   message: "An error occurred while saving the menu item.",
    //   // });
    // }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      _id: "",
      name: "",
      description: "",
      price: 0,
      category: "",
      available: true,
      imageUrl: "",
    });
  };

  return (
    <div className='flex flex-col min-h-screen sm:pl-14'>
      <main className='flex-1 py-8'>
        <div className='container mx-auto'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold'>Menu Items</h1>
            <Button onClick={() => setShowForm(true)}>Add New Item</Button>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full table-auto'>
              <thead>
                <tr className='bg-muted text-muted-foreground'>
                  <th className='px-4 py-2 text-left'>Image</th>
                  <th className='px-4 py-2 text-left'>Name</th>
                  <th className='px-4 py-2 text-left'>Description</th>
                  <th className='px-4 py-2 text-left'>Price</th>
                  <th className='px-4 py-2 text-left'>Category</th>
                  <th className='px-4 py-2 text-left'>Available</th>
                  <th className='px-4 py-2 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item._id} className='border-b'>
                    <td className='px-4 py-2'>
                      <Image
                        src={process.env.NEXT_PUBLIC_API_URL + "/"+item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className='rounded-md'
                        style={{ aspectRatio: "80/80", objectFit: "cover" }}
                      />
                    </td>
                    <td className='px-4 py-2'>{item.name}</td>
                    <td className='px-4 py-2'>{item.description}</td>
                    <td className='px-4 py-2'>${item.price.toFixed(2)}</td>
                    <td className='px-4 py-2'>{item.category}</td>
                    <td className='px-4 py-2'>
                      {item.available ? (
                        <Badge variant='secondary'>Available</Badge>
                      ) : (
                        <Badge variant='outline'>Unavailable</Badge>
                      )}
                    </td>
                    <td className='px-4 py-2'>
                      <div className='flex space-x-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {showForm && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-background p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4'>
              {formData._id ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>
            <form onSubmit={handleSave}>
              <div className='mb-4'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  type='text'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor='price'>Price</Label>
                <Input
                  id='price'
                  type='number'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor='category'>Category</Label>

                <Select
                  value={formData.category} // Bind the state variable to the Select component
                  onValueChange={handleCategoryChange} // Handle the change event
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Appetizer'>Appetizer</SelectItem>
                    <SelectItem value='Main Course'>Main Course</SelectItem>
                    <SelectItem value='Dessert'>Dessert</SelectItem>
                    <SelectItem value='Beverage'>Beverage</SelectItem>

                  </SelectContent>
                </Select>

                {/* <Select
                  value={formData.category}
                  required
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <option value=''>Select a category</option>
                  <option value='Appetizer'>Appetizer</option>
                  <option value='Entree'>Entree</option>
                  <option value='Dessert'>Dessert</option>
                  <option value='Salad'>Salad</option>
                  <option value='Beverage'>Beverage</option>
                </Select> */}
              </div>
              <div className='mb-4 flex items-center gap-2'>
                <Label htmlFor='available'>Available</Label>
                {/* <Switch
                  id='available'
                  // checked={formData.available}
                  // value={formData.available}
                  // checked={formData.available}
                  checked={formData.available}
                  // value={formData.available}
                  onChange={(e) => {
                    setFormData((prevFormData) => {
                      const updatedFormData = {
                        ...prevFormData,
                        available: !prevFormData.available,
                      };
                      console.log("updatedFormData", updatedFormData);
                      return updatedFormData;
                    });
                  }}
                /> */}

<Switch
  id='available'
  checked={formData.available}
  onClick={() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      available: !prevFormData.available,
    }));
  }}
/>
              </div>
              <div className='mb-4'>
                <Label htmlFor='image'>Image</Label>
                <Input
                  id='image'
                  type='file'
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.files[0] })  
                    setIsFileBtnClicked(true);               
                   }}
                />
              </div>
              <div className='flex justify-end space-x-2'>
                <Button variant='outline' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type='submit'>Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
          <div className='bg-background p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4'>Delete Menu Item</h2>
            <p className='mb-4'>
              Are you sure you want to delete {itemToDelete?.name}?
            </p>
            <div className='flex justify-end space-x-2'>
              <Button variant='outline' onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant='destructive' onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* {notification && (
        <div
          className={`fixed bottom-4 left-4 bg-${
            notification.type === "success" ? "green" : "red"
          }-500 text-white px-4 py-2 rounded-md shadow-lg`}
        >
          {notification.message}
        </div>
      )} */}
    </div>
  );
}
