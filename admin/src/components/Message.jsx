import React, { useContext, useState, useEffect, useRef } from "react";
import { AdminContext } from "./context/adminContext";
import axios from "axios";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";
import { SendHorizonal } from "lucide-react";

const Message = () => {
  const { uniqueRecipients, id, getUniqueRecipientsWithLatestMessage } = useContext(AdminContext);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [msg, setMsg] = useState("");
  const conversationEndRef = useRef(null);

  useEffect(() => {
    if (uniqueRecipients.length > 0 && !selectedRecipient) {
      setSelectedRecipient(uniqueRecipients[0].recipient);
    }
  }, [uniqueRecipients, selectedRecipient]);

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchConversation = async () => {
      if (selectedRecipient) {
        try {
          const response = await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/v1/messages/getMessages", { sender: id, receiver: selectedRecipient._id });
          setConversation(response.data.message);
        } catch (error) { console.error("Error fetching conversation:", error); }
      }
    };
    fetchConversation();
  }, [selectedRecipient, id]);

  useEffect(() => { scrollToBottom(); }, [conversation]);

  const handleSubmitSend = async (e) => {
    e.preventDefault();
    if (!msg.trim() || !selectedRecipient) return;
    try {
      await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/v1/messages/sendMessage", { sender: id, senderType: "Admin", receiver: selectedRecipient._id, message: msg, receiverType: "employee" });
      toast.success("Message sent successfully!");
      setMsg("");
      const updatedConversation = await axios.post("${import.meta.env.VITE_API_BASE_URL}/api/v1/messages/getMessages", { sender: id, receiver: selectedRecipient._id });
      setConversation(updatedConversation.data.message);
      getUniqueRecipientsWithLatestMessage();
    } catch (error) { console.error("Error sending message:", error); }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[85vh]">
      <Toaster position="top-center" richColors />
      <div className="border border-gray-200 lg:w-[30%] bg-white rounded-2xl shadow-lg flex flex-col">
        <h2 className="p-4 text-xl font-bold text-orange-900 border-b">Conversations</h2>
        <div className="overflow-y-auto">
          {uniqueRecipients.map((data) => (
            <div key={data?.recipient?._id} className={`flex gap-4 p-4 cursor-pointer border-l-4 ${selectedRecipient?._id === data?.recipient?._id ? "bg-amber-50 border-amber-500" : "border-transparent hover:bg-gray-50"}`} onClick={() => setSelectedRecipient(data?.recipient)}>
              <img src={data?.recipient?.profilePic} alt="profile" className="w-12 h-12 rounded-full" />
              <div className="overflow-hidden">
                <h3 className="font-semibold text-stone-800">{data?.recipient?.name}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {data?.latestMessage?.senderType === "Admin" ? "You: " : ''}
                  {data?.latestMessage?.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 lg:w-[70%] bg-white rounded-2xl shadow-lg flex flex-col">
        {selectedRecipient ? (
          <>
            <div className="flex items-center gap-4 p-4 border-b">
              <img src={selectedRecipient.profilePic} alt="recipient profile" className="w-12 h-12 rounded-full"/>
              <h2 className="text-xl font-bold text-stone-800">{selectedRecipient.name}</h2>
            </div>
            <div className="flex-grow p-4 overflow-y-auto bg-orange-50/30">
              {conversation.map((msg, index) => (
                <div key={index} className={`flex my-2 ${msg.senderType === "Admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.senderType === "Admin" ? "bg-orange-600 text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={conversationEndRef} />
            </div>
            <form className="flex items-center gap-4 p-4 border-t" onSubmit={handleSubmitSend}>
              <textarea placeholder="Type your message..." className="w-full p-3 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-amber-500" rows={2} value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
              <Button type="submit" className="p-3 rounded-lg bg-orange-700 hover:bg-orange-800" size="icon"><SendHorizonal className="w-6 h-6 text-white"/></Button>
            </form>
          </>
        ) : <div className="flex items-center justify-center h-full text-xl text-gray-500">Select a conversation to start messaging.</div>}
      </div>
    </div>
  );
};

export default Message;