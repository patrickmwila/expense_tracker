import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList, { ExpenseItem } from './components/ExpenseList';
import categories from './components/categories';

function App() {
  // === hooks === //
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // === variables === //
  const filteredExpenses =
    categories[0] !== selectedCategory && selectedCategory
      ? expenses.filter((e) => selectedCategory === e.category)
      : expenses;

  return (
    <>
      <h1>Expense Tracker</h1>

      <ExpenseForm
        onData={(expense) =>
          setExpenses([
            ...expenses,
            { ...(expense as ExpenseItem), id: expenses.length + 1 },
          ])
        }
      />

      <ExpenseFilter
        onSelectedFilter={(category) => setSelectedCategory(category)}
      />
      {console.log(expenses)}

      <ExpenseList
        expenseList={filteredExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </>
  );
}

export default App;
