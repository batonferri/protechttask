import axios from "axios";
import React from "react";

function TableBody({ products, setEditInfo, userId, setRefetch }) {
  const handleSubmit = async (id) => {
    try {
      await axios.delete("http://localhost:80/api/product.php", {
        data: {
          user_id: userId,
          id: id,
        },
      });
      setRefetch((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <tbody>
      {products.map((product) => (
        <tr
          key={product.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {product.product_name}
          </th>
          <td className="px-6 py-4">${product.price}</td>
          <td className="px-6 py-4 text-right">
            <button
              onClick={() =>
                setEditInfo({
                  id: product.id,
                  product_name: product.product_name,
                  price: product.price,
                })
              }
              type="button"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </button>
          </td>
          <td className="px-6 py-4 text-right">
            <button
              onClick={() => handleSubmit(product.id)}
              type="button"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
