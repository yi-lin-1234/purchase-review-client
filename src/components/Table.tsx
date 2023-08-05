import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Purchase } from "../type";

import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/20/solid";

function Table({ purchases }: { purchases: Purchase[] }) {
  const [sortedPurchases, setSortedPurchases] = useState<Purchase[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortPurchasesByPrice = () => {
    const sorted = [...sortedPurchases].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.Price - b.Price;
      } else {
        return b.Price - a.Price;
      }
    });

    setSortedPurchases(sorted);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    // Update the sortedPurchases state when purchases prop changes
    setSortedPurchases(purchases);
  }, [purchases]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div className="flex items-center">
                        Price
                        {sortDirection === "asc" ? (
                          <ArrowTrendingDownIcon
                            onClick={sortPurchasesByPrice}
                            className="h-5 w-5 text-gray-400 ml-2"
                          />
                        ) : (
                          <ArrowTrendingUpIcon
                            onClick={sortPurchasesByPrice}
                            className="h-5 w-5 text-gray-400 ml-2"
                          />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Evaluation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sortedPurchases.map((purchase) => (
                    <tr key={purchase.ID} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <Link to={`/dashboard/detail/${purchase.ID}`}>
                          {purchase.Name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${purchase.Price}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {purchase.Category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {purchase.Evaluation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
