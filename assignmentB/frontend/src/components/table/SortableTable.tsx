import React, { useState } from 'react';

/****************************************
 * `SortableTableProps` interface:
 * - Defines the structure of the props that the `SortableTable` component will receive.
 * - `headers`: An array of objects where each object represents a column in the table.
 *     - `key`: A unique identifier for the column, which is used to access data from each row.
 *     - `label`: The display name of the column header.
 * - `data`: An array of objects where each object represents a row in the table.
 ****************************************/
interface SortableTableProps {
  headers: { key: string; label: string }[]; // Array of headers with a key and label for each column
  data: any[]; // Array of row data
}

/****************************************
 * `SortableTable` functional component:
 * - Renders a table with dynamic headers and rows.
 * - Provides sorting functionality based on the header clicked.
 * - Sorting order toggles between ascending ('asc') and descending ('desc').
 ****************************************/
const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {
  /****************************************
   * State to manage sorting:
   * - `sortKey`: The key of the column being sorted.
   * - `sortOrder`: The current sorting order ('asc' for ascending, 'desc' for descending).
   * - `sortedData`: The data sorted based on the selected column and order.
   ****************************************/
  const [sortKey, setSortKey] = useState<string | null>(null); // Key of the currently sorted column
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sorting order (asc or desc)
  const [sortedData, setSortedData] = useState(data); // Sorted version of the data

  /****************************************
   * `handleSort` function:
   * - Handles sorting when a table header is clicked.
   * - Sorts the data based on the column's key and toggles the sort order.
   * - Updates the state with the sorted data and the sorting settings.
   * 
   * Parameters:
   * - `key`: The key of the column being sorted.
   ****************************************/
  const handleSort = (key: string) => {
    // Toggle the sorting order: if it's currently 'asc', change to 'desc'; otherwise, set it to 'asc'.
    const order: 'asc' | 'desc' = sortOrder === 'asc' ? 'desc' : 'asc';

    // Sort the data based on the selected column key and the sorting order.
    const sorted = [...data].sort((a, b) => {
      // If a[key] is less than b[key], place it higher or lower in the array depending on the sorting order.
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      // If a[key] is greater than b[key], place it higher or lower in the array depending on the sorting order.
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      // If a[key] and b[key] are equal, keep them in the same order.
      return 0;
    });

    // Update the sortKey, sortOrder, and sortedData state with the new values.
    setSortKey(key); // Update the key of the column being sorted
    setSortOrder(order); // Update the sorting order
    setSortedData(sorted); // Update the sorted data
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key} onClick={() => handleSort(header.key)}>
              {header.label}
              {/****************************************
               * Display an arrow next to the column header to indicate sorting direction:
               * - If the current `sortKey` matches the `header.key`, display the arrow.
               * - If `sortOrder` is 'asc', show an upward arrow (🔼); otherwise, show a downward arrow (🔽).
               ****************************************/}
              {sortKey === header.key ? (sortOrder === 'asc' ? ' 🔼' : ' 🔽') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/****************************************
         * Map over the `sortedData` (which is the sorted version of `data`) to generate table rows.
         * - Each `row` is an object, and `i` is the row index (used as a key for the table row).
         * - For each `header.key`, render the corresponding `row[header.key]` inside a `<td>` (table data) element.
         ****************************************/}
        {sortedData.map((row, i) => (
          <tr key={i}>
            {headers.map((header) => (
              <td key={header.key}>{row[header.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
