import { useForm, FieldValues } from 'react-hook-form';

// === interface == //
interface Props {
  selectItems: string[];
  onData: (data: object) => void;
}

const ExpenseForm = ({ selectItems, onData }: Props) => {
  // === hooks === //
  const { handleSubmit, register, reset } = useForm();

  // === custom functions === //
  const onSubmit = (data: FieldValues) => {
    onData(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register('description')}
          id="description"
          type="text"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register('amount')}
          id="amount"
          type="number"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>

        <select {...register('category')} id="category" className="form-select">
          {selectItems.map((selectItem, index) => (
            <option key={index} value={selectItem}>
              {selectItem !== 'All categories' && selectItem}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
