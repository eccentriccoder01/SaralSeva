import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./context/adminContext";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
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
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  Label,
  PieChart,
  Pie,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "./ui/chart";
import { toast ,Toaster} from "sonner"


const SingleEmployee = () => {
  const { id } = useParams();
  const [performance, setPerformance] = useState([{}]);
  const [grievancePerformance, setGrievancePerformance] = useState([{}]);
  const { id: sender ,getUniqueRecipientsWithLatestMessage} = useContext(AdminContext);
  const [singleEmployee, setSingleEmployee] = useState([]);

  const handleSingleEmployee = async (id) => {
    try {
      await axios
        .get(`http://localhost:5000/api/v1/employee/getSingleEmployee/${id}`)
        .then((res) => {
          console.log(res);
          setSingleEmployee(res.data.employee);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSingleEmployee(id);
  }, [id]);

  const employeePerformance = async (id) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/employee/employeePerformance",
      { id }
    );
    console.log(res);
    // return res.data.data
    setPerformance(res.data.data);
  };

  useEffect(() => {
    employeePerformance(id);
  }, []);

  const employeeGreivancePerformance = async (id) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/employee/employeeGrievancePerformance",
      { id }
    );
    console.log(res);
    setGrievancePerformance(res.data.data);
  };

  useEffect(() => {
    employeeGreivancePerformance(id);
  }, []);
  const chartConfig = {
    total: {
      label: "Total Tickets",
      color: "#1C4532",
    },
    open: {
      label: "Open Tickets",
      color: "#48BB78",
    },
    close: {
      label: "Close Tickets",
      color: "#2F855A",
    },
  };

  const chartConfig1 = {
    total: {
      label: "Total Grievances",
      color: "#1C4532",
    },
    open: {
      label: "Open grievances",
      color: "#48BB78",
    },
    close: {
      label: "Close grievances",
      color: "#2F855A",
    },
  };
 

  const overallTotal = performance[0]?.total + grievancePerformance[0]?.total;
  const overallClose = performance[0]?.close + grievancePerformance[0]?.close;
  const overallOpen = performance[0]?.open + grievancePerformance[0]?.open;

  const chartData = [
    { ticket: "close", total: overallClose, fill: "var(--color-close)" },
    { ticket: "open", total: overallOpen, fill: "var(--color-open)" },
  ];
  const chartConfig2 = {
    close: {
      label: "Close",
      color: "#1C4532",
    },
    open: {
      label: "Open",
      color: "#48BB78",
    },
  };

  const totalTickets = (Number(overallClose) / Number(overallTotal)) * 100;

  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSubmitSend = async (receiverId) => {
    const senderType = "Admin";
    const receiver = id;
    const message = msg;
    const receiverType = "employee";

    try {
     const response = await axios.post("http://localhost:5000/api/v1/messages/sendMessage", {
        sender,
        senderType,
        receiver,
        message,
        receiverType,
      });
      toast(
        <div className='w-full p-4 text-white bg-green-900 rounded-lg'>
          <h1 className="text-lg">Message sent successfully</h1>
        </div>
      );
      
      setMsg("");
      handleClose();
      getUniqueRecipientsWithLatestMessage();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="pt-10 lg:pt-0">
      <Toaster/>
      <div className="float-right">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger>
            <span className="flex items-center gap-2 px-5 py-1 text-lg text-white bg-green-900 rounded-md">
              Message
              <SendHorizontal className="w-5 h-5" />
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Message:<span> {singleEmployee?.name}</span>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <textarea
                  name=""
                  id=""
                  rows={5}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded-md"
                ></textarea>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                type="submit"
                onClick={handleSubmitSend}
                className="flex gap-2 px-5 text-lg bg-green-900"
              >
                SEND <SendHorizontal className="w-5 h-5" />
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h1 className="my-4 text-3xl ">Employee Profile</h1>

      <div className="flex flex-col items-center gap-5 lg:flex-row">
        {singleEmployee?.profilePic ? (
          <img
            src={singleEmployee.profilePic}
            alt="Profile"
            className="rounded-full h-60 w-60"
          />
        ) : (
          <></>
        )}
        <div className="flex flex-col">
          <h1 className="text-lg">
            Name : <span className="text-xl">{singleEmployee?.name}</span>
          </h1>
          {singleEmployee?.DOB ? (
            <h1 className="text-lg">
              DOB : <span className="text-xl">{singleEmployee?.DOB}</span>
            </h1>
          ) : (
            <></>
          )}
          {singleEmployee?.address ? (
            <h1 className="text-lg ">
              Address :{" "}
              <span className="text-xl">{singleEmployee?.address}</span>
            </h1>
          ) : (
            <></>
          )}
          <h1 className="text-lg">
            Gender : <span className="text-xl">{singleEmployee?.gender}</span>
          </h1>
          <h1 className="text-lg">
            Email : <span className="text-xl">{singleEmployee?.email}</span>
          </h1>
          <h1 className="text-lg">
            Mobile : <span className="text-xl">{singleEmployee?.mobile}</span>
          </h1>
          <h1 className="text-lg ">
            Employee ID :{" "}
            <span className="text-xl">{singleEmployee?.empId}</span>
          </h1>
        </div>
      </div>

      <div>
        <h1 className="mt-10 text-3xl ">Employee Performance</h1>
        <div className="flex flex-col gap-10 lg:flex-row">
          <ChartContainer
            config={chartConfig}
            className="lg:w-[33%] w-[100%] max-h-[350px]"
          >
            <h1 className="mt-8 text-2xl text-center">Ticket</h1>
            <BarChart accessibilityLayer data={performance}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="total" fill={chartConfig.total.color} radius={4}>
                <LabelList dataKey="total" position="top" />
              </Bar>
              <Bar dataKey="close" fill={chartConfig.close.color} radius={4}>
                <LabelList dataKey="close" position="top" />
              </Bar>
              <Bar dataKey="open" fill={chartConfig.open.color} radius={4}>
                <LabelList dataKey="open" position="top" />
              </Bar>
            </BarChart>
          </ChartContainer>

          <ChartContainer
            config={chartConfig1}
            className="lg:w-[33%] w-[100%] max-h-[350px]"
          >
            <h1 className="mt-8 text-2xl text-center">Grievances</h1>
            <BarChart accessibilityLayer data={grievancePerformance}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="total" fill={chartConfig1.total.color} radius={4}>
                <LabelList dataKey="total" position="top" />
              </Bar>
              <Bar dataKey="close" fill={chartConfig1.close.color} radius={4}>
                <LabelList dataKey="close" position="top" />
              </Bar>
              <Bar dataKey="open" fill={chartConfig1.open.color} radius={4}>
                <LabelList dataKey="open" position="top" />
              </Bar>
            </BarChart>
          </ChartContainer>

          <ChartContainer
            config={chartConfig2}
            className="lg:w-[25%] w-[100%] max-h-[230px]"
          >
            <h1 className="mt-8 text-2xl text-center ">Overall Performance</h1>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="ticket"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-3xl font-bold fill-foreground"
                          >
                            {totalTickets.toFixed(2)}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Progress
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default SingleEmployee;
