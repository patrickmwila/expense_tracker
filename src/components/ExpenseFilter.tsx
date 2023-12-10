import categories from './categories';
interface Props {
  onSelectedFilter: (selectedOption: string) => void;
}

const ExpenseFilter = ({ onSelectedFilter }: Props) => {
  return (
    <>
      <div className="mt-3">
        <select
          className="form-select"
          onChange={(event) => onSelectedFilter(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default ExpenseFilter;
