import React from "react";

const TableHeader = ({ titles, update, discard }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {titles.map((title, i) => (
          <th key={i} scope="col" className="px-6 py-3">
            {title}
          </th>
        ))}
        {update && (
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Update</span>
          </th>
        )}
        {discard && (
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">delete</span>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
