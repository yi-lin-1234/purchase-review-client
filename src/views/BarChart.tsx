import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  groupPurchasesByCategory,
  groupPurchasesByEvaluation,
} from "../util/helper";
import { getAllPurchases } from "../apiService";
import Error from "./Error";
import { ChartData } from "../type";

// eslint-disable-next-line
import "chart.js/auto";

function BarChart() {
  const [chartDataCategory, setChartDataCategory] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Number of Purchases",
        data: [],
        backgroundColor: "#629DDD",
        borderWidth: 2,
      },
    ],
  });
  const [chartDataEvaluation, setChartDataEvaluation] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Number of Purchases",
        data: [],
        backgroundColor: "#629DDD",
        borderWidth: 2,
      },
    ],
  });

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllPurchases();

        const groupedDataCategory = groupPurchasesByCategory(data);
        const labelsCategory = groupedDataCategory.map((obj) => obj.category);
        const dataCategory = groupedDataCategory.map((obj) => obj.count);
        setChartDataCategory({
          labels: labelsCategory,
          datasets: [
            {
              label: "Number of Purchases",
              data: dataCategory,
              backgroundColor: "#629DDD",
              borderWidth: 2,
            },
          ],
        });

        const groupedDataEvaluation = groupPurchasesByEvaluation(data);
        const labelsEvaluation = groupedDataEvaluation.map(
          (obj) => obj.evaluation
        );
        const dataEvaluation = groupedDataEvaluation.map((obj) => obj.count);
        setChartDataEvaluation({
          labels: labelsEvaluation,
          datasets: [
            {
              label: "Number of Purchases",
              data: dataEvaluation,
              backgroundColor: "#629DDD",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (error) return <Error error={error} />;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 h-screen">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        {/* Details section */}
        <section aria-labelledby="details-heading">
          <div className="flex flex-col items-center text-center">
            <h2
              id="details-heading"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Purchase Statistics
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-600">
              Explore our wide range of purchases and see how they are grouped
              by category and evaluation. Gain insights into popular categories
              and evaluations.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div>
              <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                <Bar
                  data={chartDataCategory}
                  options={{ responsive: true, indexAxis: "y" }}
                />
              </div>
              <p className="mt-8 text-base text-gray-500">
                This chart represents the number of purchases available for each
                category in our collection. Discover the most popular categories
                among the purchases.
              </p>
            </div>
            <div>
              <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                <Bar
                  data={chartDataEvaluation}
                  options={{ responsive: true, indexAxis: "y" }}
                />
              </div>
              <p className="mt-8 text-base text-gray-500">
                Here we have grouped the purchases by their evaluation. It gives
                you an idea about the distribution of different evaluation
                levels among the purchases.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BarChart;
