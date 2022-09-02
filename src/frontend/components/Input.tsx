export const Input = ({
  value,
  formik,
}: {
  value: string;
  formik: any;
  data?: any;
  content?: any;
  bucket?: string;
  isMultiple?: boolean;
}) => {
  const handleInput = () => {
    return (
      <input
        type='text'
        className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
        id={value}
        name={value}
        onChange={formik.handleChange}
        value={formik.values[value]}
        placeholder={`Name of ${value}`}
      />
    );
  };
  const handleValue = (text: string) => {
    return text
      .split('_')
      .map((item) => (item = item.charAt(0).toUpperCase() + item.substring(1)))
      .join(' ')
      .replace('Id', '')
      .trim();
  };
  return (
    <div className='mb-6'>
      <label htmlFor={value} className='block pb-2 text-xl'>
        {handleValue(value)}
      </label>
      {handleInput()}
      {formik.touched[value] && formik.errors[value] && (
        <p className=' text-red-500'>{formik.errors[value]}</p>
      )}
    </div>
  );
};
