import { MouseEvent } from 'react';

export interface ExpenseItem {
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expenseList: ExpenseItem[];
  totalAmount: number;
  onDelete: (index: number) => void;
}

const ExpenseList = ({ expenseList, totalAmount, onDelete }: Props) => {
  // === custom functions === //
  const handleOnClick = (event: MouseEvent) => {
    const index = Number((event.currentTarget as HTMLButtonElement).value);
    onDelete(index);
  };

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
            {expenseList.map((itemObj, index) => (
              <tr key={index}>
                <td>{itemObj.description}</td>
                <td>K{itemObj.amount}</td>
                <td>{itemObj.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    value={index}
                    onClick={handleOnClick}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td>K{totalAmount}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExpenseList;
