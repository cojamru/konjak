import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useField, useFormikContext } from 'formik';

export const DatePickerField = props => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      value={dayjs(field.value)}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
