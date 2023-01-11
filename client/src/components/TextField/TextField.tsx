import { useMemo } from 'react';

import { Input } from 'antd';
import { ErrorMessage, useField } from 'formik';

export const TextField = props => {
  const [field, meta] = useField(props);

  const status = useMemo(() => {
    if (meta.error && meta.touched) {
      return 'error';
    }
    return 'success';
  }, [meta.error, meta.touched]);

  return (
    <>
      <Input status={status} {...field} {...props} />
      <ErrorMessage {...field} />
    </>
  );
};
