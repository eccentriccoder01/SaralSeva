import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Megaphone } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";

const Announcement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [announcement_details,setAnnouncement_details] = useState("");
  const [announcement,setAnnouncement] = useState([]);
  const handleAnnouncement = async() =>{
    try {
      await axios.post("http://localhost:5000/api/v1/announcement/add_announcement",{announcement_details})
      .then((res) => {
       if(res.data.message==='announcement added succesfully'){
         toast(
           <div className='w-full p-4 text-white bg-green-900 rounded-lg'>
             <h1 className="text-md">Announcement added succesfully</h1>
           </div>
         )
         handleClose()
         getAnnouncement()
       } 
         })
    } catch (error) {
      console.log(error)
    }
  }

  const getAnnouncement = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/announcement/get_announcement"
      );
      setAnnouncement(res.data.announcement);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnnouncement();
  }, []);
  return (
    <div className="pt-10 lg:pt-0">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger className="flex float-right gap-3 px-10 py-2 text-xl text-white bg-green-900 rounded-md">Add <Megaphone /></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Anouncement</AlertDialogTitle>
            <AlertDialogDescription>
              <textarea name="" id="" rows={5} className="w-full p-3 border border-gray-500" onChange={(e) => setAnnouncement_details(e.target.value)}></textarea>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleAnnouncement}>Add</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
     
      <h1>Announcement</h1>
      {
         announcement.map((item,index) => {
          return (
            <div className="flex flex-col mt-3" key={item.id}>
              <p>{index+1}.{item.announcement_details}</p>
            </div>  
          )
         })
      }
    </div>
  );
};

export default Announcement;
