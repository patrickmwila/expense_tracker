import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList, { ExpenseItem } from './components/ExpenseList';

function App() {
  //== hooks == //
  const [expenseData, setExpenseData] = useState({});
  const [allExpenseData, setAllExpenseData] = useState<ExpenseItem[]>([]);
  const [filteredData, setFilteredData] = useState<ExpenseItem[]>([]);
  const [filteredOption, setFilteredOption] = useState('All categories');
  const [totalAmount, setTotalAmount] = useState(0);

  // == variables == //
  const categories = [
    'All categories',
    'Groceries',
    'Utilities',
    'Entertainment',
  ];

  // == functions == //
  const handleData = (data: object) => {
    setExpenseData(data);
  };

  const handleFiltereChange = (selectedOption: string) => {
    setFilteredOption(selectedOption);
  };

  const calculateTotalAmount = (filteredData: ExpenseItem[]) => {
    let total = 0;

    filteredData.forEach((data) => {
      total += data.amount;
    });

    setTotalAmount(total);
  };

  const handleDeletion = (itemToDelete: number) => {
    // Use the setFilteredData function to update the state
    setFilteredData((prevData) => {
      // Filter out the item with the specified index from the previous data
      const updatedData = prevData.filter(
        (item, index) => index !== itemToDelete
      );
      setAllExpenseData(updatedData);
      return updatedData;
    });
  };

  // == misc hooks == //
  useEffect(() => {
    // Update the array whenever expenseData changes
    if (Object.keys(expenseData).length > 0) {
      setAllExpenseData((prevData) => [
        ...prevData,
        expenseData as ExpenseItem,
      ]);
    }
  }, [expenseData]);

  // Filter allExpenseData based on filteredOption
  useEffect(() => {
    if (filteredOption === 'All categories') {
      // If 'All categories' selected, set filteredData to allExpenseData
      setFilteredData(allExpenseData);
      calculateTotalAmount(allExpenseData);
    } else {
      const filteredItems = allExpenseData.filter(
        (item) => item.category === filteredOption
      );
      setFilteredData(filteredItems);
      calculateTotalAmount(filteredItems);
    }
  }, [allExpenseData, filteredOption]);

  return (
    <>
      <h1>Expense Tracker</h1>

      <ExpenseForm selectItems={categories} onData={handleData} />

      <ExpenseFilter
        selectItems={categories}
        onFilterChange={handleFiltereChange}
      />

      <ExpenseList
        expenseList={filteredData}
        totalAmount={totalAmount}
        onDelete={handleDeletion}
      />
    </>
  );
}

export default App;
