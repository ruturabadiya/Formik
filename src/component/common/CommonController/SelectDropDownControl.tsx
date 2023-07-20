import { ErrorMessage, useFormikContext } from 'formik';
import { ChangeEvent, SelectHTMLAttributes } from 'react';

interface SelectControllerProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    name: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    as: string;
}

const dropdown = [
    { key: 'male', value: 'Male' },
    { key: 'female', value: 'Female' }
];

export const DropdownFieldController: React.FC<SelectControllerProps> = ({
    name,
    placeholder,
    as,
}) => {
    const { setFieldValue,values}: any = useFormikContext();
    const selectedValue = values ? values.gender : "Select your gender"; 
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setFieldValue(name, newValue);
    };
    console.log()

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
                    {dropdown.map(option => (
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
