import ReactSelect, { SingleValue } from 'react-select';
import { useField } from 'formik';
import { ServerOption } from '../../types';

const FieldSelect: React.FC<{
  name: string;
  options: ServerOption[];
  placeholder?: string;
  className?: string;
}> = ({ name, className, ...props }) => {
  const [field, meta, helpers] = useField<ServerOption>(name);

  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const handleChange = (newValue: SingleValue<ServerOption>) => {
    console.log(meta);
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
