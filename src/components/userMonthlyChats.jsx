import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function UserMonthlyCharts() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Placed Orders", "Orders in Progress", "Shipped Orders"],
        datasets: [
          {
            data: [15, 8, 12],
            backgroundColor: [
              "rgba(59, 130, 246, 0.5)",
              "rgba(234, 179, 8, 0.5)",
              "rgba(34, 197, 94, 0.5)"
            ],
            borderColor: [
              "rgba(59, 130, 246, 1)",
              "rgba(234, 179, 8, 1)",
              "rgba(34, 197, 94, 1)"
            ],
            borderWidth: 1,
            borderRadius: 6,
            barThickness: 40
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2
            },
            grid: {
              color: "#e5e7eb"
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="w-full  mt-7">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1">
          Monthly Order Summary
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          A visual overview of recent order statuses
        </p>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[400px]" style={{ height: "300px" }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}