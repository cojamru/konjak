import * as Yup from 'yup';

export const CreateFormValidationSchema = Yup.object().shape({
  title: Yup.string().required('Please enter title'),
  platform: Yup.string().required('Please enter platform'),
  slug: Yup.string().required('Please enter slug'),
  description: Yup.string().required('Please enter description'),
  links: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Enter title'),
      url: Yup.string().required('Enter url'),
    }),
  ),
});
