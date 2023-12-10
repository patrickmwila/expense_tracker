import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import categories from './categories';

// === define validation rules strudture === //
const schema = z.object({
  description: z
    .string()
    .min(3, { message: 'Description should be atleast 3 characters.' }),
  amount: z
    .number({ invalid_type_error: 'Amount is required' })
    .min(0.01)
    .max(100_000),
  category: z.string().refine((val) => val !== 'All categories', {
    message: 'Category is required.',
  }),
});
type FormData = z.infer<typeof schema>;

// === interface == //
interface Props {
  onData: (data: object) => void;
}

const ExpenseForm = ({ onData }: Props) => {
  // === hooks === //
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onData(data);
        reset();
      })}
    >
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
          {...register('amount', { valueAsNumber: true })}
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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category !== 'All categories' && category}
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
