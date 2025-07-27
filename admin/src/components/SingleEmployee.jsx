import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./context/adminContext";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList, PieChart, Pie, Label } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./ui/chart";
import { toast, Toaster } from "sonner";

const SingleEmployee = () => {
  const { id } = useParams();
  const [performance, setPerformance] = useState([{}]);
  const [grievancePerformance, setGrievancePerformance] = useState([{}]);
  const { id: sender, getUniqueRecipientsWithLatestMessage } = useContext(AdminContext);
  const [singleEmployee, setSingleEmployee] = useState({});
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleSingleEmployee = async (id) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/getSingleEmployee/${id}`);
        setSingleEmployee(res.data.employee);
      } catch (error) { console.log(error); }
    };
    const employeePerformance = async (id) => {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/employeePerformance`, { id });
      setPerformance(res.data.data);
    };
    const employeeGreivancePerformance = async (id) => {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/employee/employeeGrievancePerformance`, { id });
      setGrievancePerformance(res.data.data);
    };
    handleSingleEmployee(id);
    employeePerformance(id);
    employeeGreivancePerformance(id);
  }, [id]);

  const chartConfig = { total: { label: "Total Tickets" }, open: { label: "Open Tickets" }, close: { label: "Close Tickets" } };
  const chartConfig1 = { total: { label: "Total Grievances" }, open: { label: "Open Grievances" }, close: { label: "Close Grievances" } };
  const overallTotal = (performance[0]?.total || 0) + (grievancePerformance[0]?.total || 0);
  const overallClose = (performance[0]?.close || 0) + (grievancePerformance[0]?.close || 0);
  const totalTickets = overallTotal > 0 ? (Number(overallClose) / Number(overallTotal)) * 100 : 0;
  const chartConfig2 = { close: { label: "Closed", color: "#8C4312" }, open: { label: "Open", color: "#FDBA74" } };
  const chartData = [{ name: "close", value: overallClose, fill: "var(--color-close)"}, { name: "open", value: overallTotal - overallClose, fill: "var(--color-open)" }];

  const handleSubmitSend = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/messages/sendMessage`, { sender, senderType: "Admin", receiver: id, message: msg, receiverType: "employee" });
      toast.success("Message sent successfully");
      setMsg("");
      setIsOpen(false);
      getUniqueRecipientsWithLatestMessage();
    } catch (error) { console.error("Error sending message:", error); }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" richColors />
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-orange-900 jost">Employee Profile & Performance</h1>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild><Button className="gap-2 font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600">Message <SendHorizontal size={16} /></Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Message: {singleEmployee?.name}</AlertDialogTitle></AlertDialogHeader>
            <textarea rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitSend} className="bg-orange-700 hover:bg-orange-800">SEND</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
        <img src={singleEmployee.profilePic} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-amber-300" />
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1">
            <p><span className="text-gray-500">Name:</span> <span className="font-semibold">{singleEmployee?.name}</span></p>
            <p><span className="text-gray-500">Gender:</span> <span className="font-semibold">{singleEmployee?.gender}</span></p>
            <p><span className="text-gray-500">Email:</span> <span className="font-semibold">{singleEmployee?.email}</span></p>
            <p><span className="text-gray-500">Mobile:</span> <span className="font-semibold">{singleEmployee?.mobile}</span></p>
            <p><span className="text-gray-500">Employee ID:</span> <span className="font-semibold">{singleEmployee?.empId}</span></p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-stone-800 mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartContainer config={chartConfig} className="w-full h-[300px]">
            <h3 className="text-xl font-semibold text-center">Ticket Performance</h3>
            <BarChart data={performance}><CartesianGrid vertical={false} /><XAxis dataKey="month" tickFormatter={(v) => v.slice(0,3)} /><ChartLegend /><Bar dataKey="total" fill="#D97706" radius={4} /><Bar dataKey="close" fill="#92400E" radius={4} /><Bar dataKey="open" fill="#FBBF24" radius={4} /></BarChart>
          </ChartContainer>
          <ChartContainer config={chartConfig1} className="w-full h-[300px]">
            <h3 className="text-xl font-semibold text-center">Grievance Performance</h3>
            <BarChart data={grievancePerformance}><CartesianGrid vertical={false} /><XAxis dataKey="month" tickFormatter={(v) => v.slice(0,3)} /><ChartLegend /><Bar dataKey="total" fill="#D97706" radius={4} /><Bar dataKey="close" fill="#92400E" radius={4} /><Bar dataKey="open" fill="#FBBF24" radius={4} /></BarChart>
          </ChartContainer>
          <ChartContainer config={chartConfig2} className="w-full h-[300px]">
            <h3 className="text-xl font-semibold text-center">Overall Progress</h3>
            <PieChart><Pie data={chartData} dataKey="total" nameKey="ticket" innerRadius={60}><Label content={({ viewBox }) => (<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle"><tspan x={viewBox.cx} y={viewBox.cy} className="text-3xl font-bold">{totalTickets.toFixed(1)}%</tspan><tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground">Completed</tspan></text>)}/></Pie></PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default SingleEmployee;