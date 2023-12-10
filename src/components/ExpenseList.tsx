export interface ExpenseItem {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenseList: ExpenseItem[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenseList, onDelete }: Props) => {
  if (expenseList.length === 0) return null;

  return (
    <>
      <div className="mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {expenseList.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>K{expense.amount}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td>Total</td>
              <td>
                K
                {expenseList
                  .reduce((acc, expense) => expense.amount + acc, 0)
                  .toFixed(2)}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ExpenseList;
