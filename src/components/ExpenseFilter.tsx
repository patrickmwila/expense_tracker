import { ChangeEvent } from 'react';

interface Props {
  selectItems: string[];
  onFilterChange: (selectedOption: string) => void;
}

const ExpenseFilter = ({ selectItems, onFilterChange }: Props) => {
  // === functions === //
  const handleFiltering = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    onFilterChange(selectedOption);
  };

  return (
    <>
      <form>
        <div className="mb-3"></div>

        <select className="form-select" onChange={handleFiltering}>
          {selectItems.map((selectItem, index) => (
            <option key={index} value={selectItem}>
              {selectItem}
            </option>
          ))}
        </select>
      </form>
    </>
  );
};

export default ExpenseFilter;
