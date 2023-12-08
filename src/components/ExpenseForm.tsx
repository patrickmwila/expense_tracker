import { useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// === define validation rules strudture === //
const schema = z.object({
  description: z
    .string()
    .min(3, { message: 'Description should be atleast 3 characters.' }),
  amount: z
    .string()
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed >= 1;
      },
      {
        message: 'Amount must be a number greater than or equal to 1.',
      }
    )
    .transform((val) => parseFloat(val)),
  category: z.string().refine((val) => val !== 'All categories', {
    message: 'Category is required.',
  }),
});
type FormData = z.infer<typeof schema>;

// === interface == //
interface Props {
  selectItems: string[];
  onData: (data: object) => void;
}

const ExpenseForm = ({ selectItems, onData }: Props) => {
  // === hooks === //
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
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
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
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
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
