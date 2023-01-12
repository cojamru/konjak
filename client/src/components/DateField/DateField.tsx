import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useField } from 'formik';

export const DatePickerField = props => {
  const [field, , helpers] = useField(props);

  const { setValue } = helpers;

  return <DatePicker {...field} {...props} value={dayjs(field.value)} onChange={setValue} />;
};
