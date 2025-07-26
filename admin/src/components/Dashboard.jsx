import React, { useContext } from "react";
import { AdminContext } from "./context/adminContext";
import { FileText } from 'lucide-react';
import { Clock } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { XCircle } from 'lucide-react';
import {
  Label,
  PieChart,
  Pie
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";


const Dashboard = () => {
  const {
    admin,
    totalApprovedScheme,
    totalPendingScheme,
    totalRejectedScheme,
    totalSchemeProgress,
    progress,
    totalOpenGrievance,
    totalCloseGrievance,
  } = useContext(AdminContext);

  const totalOpenScheme = totalPendingScheme;
  const totalCloseScheme = totalApprovedScheme + totalRejectedScheme;
  const schemeProgress = ((totalCloseScheme / totalSchemeProgress) * 100).toFixed(2);
  const grievanceProgress = (totalCloseGrievance/(totalOpenGrievance+totalCloseGrievance))*100;


  const chartData1 = [
    { ticket: "close", total: totalCloseScheme, fill: "var(--color-close)" },
    { ticket: "open", total: totalOpenScheme, fill: "var(--color-open)" }
  ];
  const chartConfig2 = {
    close: {
      label: "Close",
      color: "#1C4532",
    },
    open: {
      label: "Open",
      color: "#48BB78",
    }
  };

  const chartData2 = [
    { ticket: "close", total: totalCloseGrievance, fill: "var(--color-close)" },
    { ticket: "open", total: totalOpenGrievance, fill: "var(--color-open)" }
  ];

  const chartData3 = [
    { ticket: "close", total: progress()[0].close, fill: "var(--color-close)" },
    { ticket: "open", total: progress()[0].open, fill: "var(--color-open)" }
  ];

  


  return (
    <div className="pt-10 lg:pt-0">
      <h1 className="text-2xl">
        welcome,<span className="text-3xl">{admin?.name}</span>
      </h1>

      <div className="flex flex-col gap-3 mt-10 md:flex-row md:flex-wrap">
        <div className="w-[340px] h-[140px] border rounded-md mx-auto hover:border-b-8 border-green-900 p-3 hover:border-green-900">
          <div className="flex justify-between group">
            <div className="flex flex-col">
              <h1>Total Scheme Applied</h1>
              <p className="mt-5 text-6xl font-bold text-green-900 ">{totalSchemeProgress}</p>
            </div>
            <FileText className="w-12 h-12 p-3 text-green-900 border border-green-900 rounded-md group-hover:bg-green-900 group-hover:text-white" />
          </div>
        </div>
        <div className="w-[340px] h-[140px] border rounded-md mx-auto hover:border-b-8 border-green-900 p-3 hover:border-green-900">
          <div className="flex justify-between group">
            <div className="flex flex-col">
              <h1>Pending</h1>
              <p className="mt-5 text-6xl font-bold text-green-900">{totalPendingScheme}</p>
            </div>
            <Clock className="w-12 h-12 p-3 text-green-900 border border-green-900 rounded-md group-hover:bg-green-900 group-hover:text-white"/>
          </div>
        </div>
        <div className="w-[340px] h-[140px] border rounded-md mx-auto hover:border-b-8 border-green-900 p-3 hover:border-green-900">
          <div className="flex justify-between group">
           <div className="flex flex-col">
              <h1>Approved</h1>
              <p className="mt-5 text-6xl font-bold text-green-900">{totalApprovedScheme}</p>
           </div>
            <CheckCircle className="w-12 h-12 p-3 text-green-900 border border-green-900 rounded-md group-hover:bg-green-900 group-hover:text-white"/>
          </div>
        </div>
        <div className="w-[340px] h-[140px] border rounded-md mx-auto hover:border-b-8 border-green-900 p-3 hover:border-green-900">
          <div className="flex justify-between group">
            <div className="flex flex-col">
              <h1>Rejected</h1>
              <p className="mt-5 text-6xl font-bold text-green-900">{totalRejectedScheme}</p>
            </div>
            <XCircle className="w-12 h-12 p-3 text-green-900 border border-green-900 rounded-md group-hover:bg-green-900 group-hover:text-white"/>
          </div>
        </div>
      </div>
        
     <div className="flex flex-col gap-3 lg:gap-5 lg:flex-row lg:justify-center">
        <div className="mt-10 lg:w-[30%] border border-gray-500 h-[300px] flex justify-center items-center rounded-md w-[90%] mx-auto lg:mx-0 ">
        <ChartContainer
            config={chartConfig2}
            className=" h-[250px]"
          >
            <h1 className="text-2xl text-center ">Scheme Progress</h1>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData1}
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
                            {schemeProgress}%
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
        
        <div className="mt-10 lg:w-[30%] border border-gray-500 h-[300px] flex justify-center items-center rounded-md w-[90%] mx-auto lg:mx-0 ">
        <ChartContainer
            config={chartConfig2}
            className=" h-[250px]"
          >
            <h1 className="text-2xl text-center ">Grievance Progress</h1>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData2}
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
                            {grievanceProgress}%
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

        <div className="mt-10 lg:w-[30%] border border-gray-500 h-[300px] flex justify-center items-center rounded-md w-[90%] mx-auto lg:mx-0 ">
        <ChartContainer
            config={chartConfig2}
            className=" h-[250px]"
          >
            <h1 className="text-2xl text-center ">overall Progress</h1>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData3}
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
                            {progress()[0].progress}%
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

export default Dashboard;
