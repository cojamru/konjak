import { useMemo } from 'react';

import { Input } from 'antd';
import { ErrorMessage, useField } from 'formik';

const { TextArea } = Input;

export const TextAreaField = props => {
  const [field, meta] = useField(props);

  const status = useMemo(() => {
    if (meta.error && meta.touched) {
      return 'error';
    }
    return 'success';
  }, [meta.error, meta.touched]);
  return (
    <>
      <TextArea status={status} {...field} {...props} />
      <ErrorMessage {...field} />
    </>
  );
};
