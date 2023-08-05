import { useState, useEffect } from "react";
import { getAllPurchases } from "../apiService";
import Table from "../components/Table";
import { Purchase } from "../type";

function All() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllPurchases();
        setPurchases(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <Table purchases={purchases} />;
}

export default All;
