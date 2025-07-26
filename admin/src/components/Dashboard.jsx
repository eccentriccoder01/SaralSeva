import React, { useContext } from "react";
import { AdminContext } from "./context/adminContext";
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { PieChart, Pie, Label } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className={`p-6 bg-white rounded-2xl shadow-lg group hover:shadow-2xl border-b-8 ${colorClass} transform hover:-translate-y-2 transition-all duration-300`}>
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold text-gray-500">{title}</h2>
        <p className="mt-2 text-5xl font-extrabold text-stone-800">{value}</p>
      </div>
      <Icon className="w-12 h-12 p-3 text-white bg-gray-300 rounded-full group-hover:bg-inherit" />
    </div>
  </div>
);

const Dashboard = () => {
  const { admin, totalApprovedScheme, totalPendingScheme, totalRejectedScheme, totalSchemeProgress, progress, totalOpenGrievance, totalCloseGrievance } = useContext(AdminContext);

  const totalOpenScheme = totalPendingScheme;
  const totalCloseScheme = totalApprovedScheme + totalRejectedScheme;
  const schemeProgress = totalSchemeProgress > 0 ? ((totalCloseScheme / totalSchemeProgress) * 100).toFixed(1) : 0;
  const grievanceProgress = (totalOpenGrievance + totalCloseGrievance) > 0 ? (totalCloseGrievance / (totalOpenGrievance + totalCloseGrievance)) * 100 : 0;

  const chartConfig = { close: { color: "#8C4312" }, open: { color: "#FDBA74" } };
  const chartDataScheme = [{ name: "close", value: totalCloseScheme, fill: "var(--color-close)" }, { name: "open", value: totalOpenScheme, fill: "var(--color-open)" }];
  const chartDataGrievance = [{ name: "close", value: totalCloseGrievance, fill: "var(--color-close)" }, { name: "open", value: totalOpenGrievance, fill: "var(--color-open)" }];
  const chartDataOverall = progress().length ? [{ name: "close", value: progress()[0].close, fill: "var(--color-close)" }, { name: "open", value: progress()[0].open, fill: "var(--color-open)" }] : [];
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-900 jost">
        Welcome, <span className="font-extrabold">{admin?.name}</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Schemes Applied" value={totalSchemeProgress} icon={FileText} colorClass="border-blue-500 hover:[&>div>svg]:bg-blue-500" />
        <StatCard title="Pending Schemes" value={totalPendingScheme} icon={Clock} colorClass="border-amber-500 hover:[&>div>svg]:bg-amber-500" />
        <StatCard title="Approved Schemes" value={totalApprovedScheme} icon={CheckCircle} colorClass="border-green-500 hover:[&>div>svg]:bg-green-500" />
        <StatCard title="Rejected Schemes" value={totalRejectedScheme} icon={XCircle} colorClass="border-red-500 hover:[&>div>svg]:bg-red-500" />
      </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[{title: "Scheme Progress", data: chartDataScheme, progress: schemeProgress}, {title: "Grievance Progress", data: chartDataGrievance, progress: grievanceProgress.toFixed(1)}, {title: "Overall Progress", data: chartDataOverall, progress: progress().length ? progress()[0].progress : 0}].map(chart => (
            <div key={chart.title} className="p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center text-stone-800">{chart.title}</h2>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chart.data} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                            <Label content={({ viewBox }) => (
                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                    <tspan x={viewBox.cx} y={viewBox.cy} className="text-3xl font-bold fill-foreground">{chart.progress}%</tspan>
                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">Completed</tspan>
                                </text>
                            )} />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;