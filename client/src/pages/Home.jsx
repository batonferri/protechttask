import React, { useState } from "react";
import EditModal from "../components/EditModal";
import TableBody from "../components/TableBody";
import TableHeader from "../components/TableHeader";
import { useQuery } from "../hooks/useFetch";
import { useUser } from "../hooks/useUser";

const Home = () => {
  const [editInfo, setEditInfo] = useState({
    id: 0,
    product_name: "",
    price: "",
  });
  const [refetch, setRefetch] = useState(false);
  const { me } = useUser();

  const { data: products } = useQuery(
    "http://localhost:80/api/product.php",
    { user_id: me.id },
    refetch
  );

  if (!products?.length)
    return (
      <p className="text-4xl text-white font-sans font-black mt-5">
        No Products
      </p>
    );

  return (
    <>
      <table className="w-full my-3 text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader titles={["product name", "price"]} update discard />
        <TableBody
          products={products}
          setEditInfo={setEditInfo}
          userId={me.id}
          setRefetch={setRefetch}
        />
      </table>

      {editInfo.id !== 0 && (
        <EditModal
          setEditInfo={setEditInfo}
          editInfo={editInfo}
          userId={me.id}
          setRefetch={setRefetch}
        />
      )}
    </>
  );
};

export default Home;
