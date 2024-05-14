import ReactSelect, { SingleValue } from 'react-select';
import { useField } from 'formik';
import { Option } from '../../types';

const FieldSelect: React.FC<{
  name: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  defaultValue?: Option;
}> = ({ name, className, ...props }) => {
  const [field, meta, helpers] = useField<Option>(name);

  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const handleChange = (newValue: SingleValue<Option>) => {
    newValue ? setValue(newValue) : null;
  };

  return (
    <>
      <ReactSelect
        {...props}
        {...field}
        isSearchable={false}
        classNamePrefix='select'
        className={`select 
          ${meta.error && meta.touched ? 'error' : meta.touched ? 'valid' : ''} 
          ${className ? className : ''}
        `}
        onChange={handleChange}
        onFocus={() => {
          setTouched(true);
        }}
        value={value}
      />
      {meta.error && meta.touched ? (
        <p className='alert' role='alert'>
          {meta.error}
        </p>
      ) : null}
    </>
  );
};

export default FieldSelect;
