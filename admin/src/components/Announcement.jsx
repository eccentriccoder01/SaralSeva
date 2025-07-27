import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Megaphone, PlusCircle } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast, Toaster } from "sonner";

const Announcement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [announcement_details, setAnnouncement_details] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  const getAnnouncements = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_BASE_URL}/api/v1/announcement/get_announcement");
      setAnnouncements(res.data.announcement);
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  const handleAnnouncement = async () => {
    try {
      const res = await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/v1/announcement/add_announcement", { announcement_details });
      if (res.data.message === 'announcement added succesfully') {
        toast.success("Announcement added successfully!");
        setIsOpen(false);
        getAnnouncements();
        setAnnouncement_details("");
      }
    } catch (error) { console.log(error); }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <Toaster position="top-center" richColors />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-900 jost">Manage Announcements</h1>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button className="gap-2 font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg shadow-md hover:shadow-lg">
              <PlusCircle size={18} /> Add New
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Announcement</AlertDialogTitle>
              <AlertDialogDescription>
                <textarea rows={5} className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-amber-500" onChange={(e) => setAnnouncement_details(e.target.value)} placeholder="Enter announcement details..."></textarea>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleAnnouncement} className="bg-orange-700 hover:bg-orange-800">Add Announcement</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-4">
        {announcements.length > 0 ? announcements.map((item, index) => (
          <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-orange-50/50" key={item.id}>
            <Megaphone className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1"/>
            <p className="text-stone-800">{item.announcement_details}</p>
          </div>
        )) : <p className="text-center text-gray-500 py-10">No announcements have been made.</p>}
      </div>
    </div>
  );
};

export default Announcement;