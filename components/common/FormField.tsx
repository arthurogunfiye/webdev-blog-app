import {
  FieldErrors,
  Path,
  UseFormRegister,
  FieldValues
} from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassNames?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
  defaultValue?: string;
  autocomplete?: string;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassNames,
  register,
  errors,
  defaultValue,
  autocomplete
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);
  return (
    <div>
      {label && <span className='block text-sm'>{label}</span>}
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        {...register(id as Path<T>)}
        className={cn(
          inputClasses,
          errors[id] && 'border-rose-400',
          inputClassNames
        )}
        defaultValue={defaultValue}
        autoComplete={autocomplete}
      />
      {message && <span className='text-sm text-rose-400'>{message}</span>}
    </div>
  );
};

export default FormField;

const inputClasses =
  'w-full p-3 my-2 outline-none rounded-md disabled:opacity-70 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700';

// ...register(id) is used to connect the input field to react-hook-form using the provided register function.
// The id is cast to Path<LoginValues> to ensure type safety, indicating that the id corresponds to a valid field in the LoginValues type.
// The errors object is used to check for validation errors related to the specific input field. If there are any errors associated with the field (identified by its id), the corresponding error message is extracted and displayed below the input field.
