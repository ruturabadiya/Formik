import { ErrorMessage, useFormikContext } from 'formik';
import { ChangeEvent, SelectHTMLAttributes } from 'react';

interface DropdownOption {
  value: string;
  key: string;
}
interface SelectControllerProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  name: string;
  selectOptions: DropdownOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownFieldController: React.FC<SelectControllerProps> = ({
  name,
  placeholder,
  selectOptions,
}) => {
  const { setFieldValue, values }: any = useFormikContext();
  const selectedValue = values[name] || placeholder; 

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setFieldValue(name, newValue);
  };

  return (
    <>
      <div className="field">
        <select
          className="gender"
          name={name}
          placeholder={placeholder}
          onChange={handleSelectChange}
        >
          <option value="">{selectedValue}</option>
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          ))}
        </select>
      </div>
      <div className="row p-0 m-0 w-100">
        <ErrorMessage name={name} component="div" className="text-danger" />
      </div>
    </>
  );
};
