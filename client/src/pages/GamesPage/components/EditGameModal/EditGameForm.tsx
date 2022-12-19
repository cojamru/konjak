import { Form, Input } from 'antd';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import { EditGameFormValuesType } from './EditGameModalTypes';

type PropsType = {
  initialTitle?: string;
  initialPlatform?: string;
  initialSlug?: string;

  handleSubmit: (values: EditGameFormValuesType) => void;
  innerRef: React.RefObject<FormikProps<EditGameFormValuesType>>;
};

const InnerForm = (props: FormikProps<EditGameFormValuesType>) => {
  const { touched, errors, values } = props;
  const { handleChange } = props;

  return (
    <Form>
      <Input onChange={handleChange} value={values.title} type="title" name="title" placeholder="title" />
      {touched.title && errors.title && <div>{errors.title}</div>}

      <Input onChange={handleChange} value={values.platform} type="platform" name="platform" placeholder="platform" />
      {touched.platform && errors.platform && <div>{errors.platform}</div>}

      <Input onChange={handleChange} value={values.slug} type="slug" name="slug" placeholder="slug" />
      {touched.slug && errors.slug && <div>{errors.slug}</div>}
    </Form>
  );
};

const FormSchema = Yup.object().shape({
  title: Yup.string().required('Please enter notification title'),
  platform: Yup.string().required('Please enter notification title'),
  slug: Yup.string().required('Please enter notification slug'),
});

export const EditGameForm = withFormik<PropsType, EditGameFormValuesType>({
  mapPropsToValues: props => {
    return {
      title: props.initialTitle || '',
      platform: props.initialPlatform || '',
      slug: props.initialSlug || '',
    };
  },

  validationSchema: FormSchema,

  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
})(InnerForm);
