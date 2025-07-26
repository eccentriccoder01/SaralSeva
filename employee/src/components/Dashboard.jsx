import React, { useContext, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList, Label, PieChart, Pie } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./ui/chart";
import { EmployeeContext } from "./context/EmployeeContext";

const Dashboard = () => {
  const { employee, performance, grievancePerformance, employeePerformance, employeeGreivancePerformance, id } = useContext(EmployeeContext);

  useEffect(() => {
    if(id) {
      employeePerformance(id);
      employeeGreivancePerformance(id);
    }
  }, [id]);

  const chartConfig = {
    total: { label: "Total Tickets", color: "hsl(24 9.8% 10%)" },
    open: { label: "Open Tickets", color: "hsl(24 9.8% 30%)" },
    close: { label: "Close Tickets", color: "hsl(30 9.8% 50%)" },
  };

  const chartConfig1 = {
    total: { label: "Total Grievances", color: "hsl(24 9.8% 10%)" },
    open: { label: "Open Grievances", color: "hsl(24 9.8% 30%)" },
    close: { label: "Close Grievances", color: "hsl(30 9.8% 50%)" },
  };

  const overallTotal = (performance[0]?.total || 0) + (grievancePerformance[0]?.total || 0);
  const overallClose = (performance[0]?.close || 0) + (grievancePerformance[0]?.close || 0);
  const overallOpen = (performance[0]?.open || 0) + (grievancePerformance[0]?.open || 0);

  const chartData = [
    { ticket: "close", total: overallClose, fill: "var(--color-close)" },
    { ticket: "open", total: overallOpen, fill: "var(--color-open)" }
  ];
  
  const chartConfig2 = {
    close: { label: "Closed", color: "#8C4312" }, // Saffron Deep
    open: { label: "Open", color: "#FDBA74" },   // Saffron Light
  };

  const totalTickets = overallTotal > 0 ? (Number(overallClose) / Number(overallTotal)) * 100 : 0;

  return (
    <div className="space-y-6">
      <p className="font-semibold text-3xl text-orange-900 jost">
        Welcome, <span className="font-extrabold">{employee?.name}</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <ChartContainer config={chartConfig} className="w-full h-[300px]">
                <h2 className="text-xl font-bold text-center text-stone-800 mb-4">Ticket Performance</h2>
                <BarChart accessibilityLayer data={performance}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="total" fill={chartConfig.total.color} radius={4}><LabelList dataKey="total" position="top" /></Bar>
                  <Bar dataKey="close" fill={chartConfig.close.color} radius={4}><LabelList dataKey="close" position="top" /></Bar>
                  <Bar dataKey="open" fill={chartConfig.open.color} radius={4}><LabelList dataKey="open" position="top" /></Bar>
                </BarChart>
              </ChartContainer>
            </div>
            
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <ChartContainer config={chartConfig1} className="w-full h-[300px]">
                <h2 className="text-xl font-bold text-center text-stone-800 mb-4">Grievance Performance</h2>
                <BarChart accessibilityLayer data={grievancePerformance}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="total" fill={chartConfig1.total.color} radius={4}><LabelList dataKey="total" position="top" /></Bar>
                  <Bar dataKey="close" fill={chartConfig1.close.color} radius={4}><LabelList dataKey="close" position="top" /></Bar>
                  <Bar dataKey="open" fill={chartConfig1.open.color} radius={4}><LabelList dataKey="open" position="top" /></Bar>
                </BarChart>
              </ChartContainer>
            </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center">
            <ChartContainer config={chartConfig2} className="w-full h-[300px]">
                <h2 className="text-xl font-bold text-center text-stone-800 mb-4">Overall Progress</h2>
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={chartData} dataKey="total" nameKey="ticket" innerRadius={60} strokeWidth={5}>
                    <Label content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="text-3xl font-bold fill-foreground">{totalTickets.toFixed(1)}%</tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">Completed</tspan>
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

export default Dashboard;