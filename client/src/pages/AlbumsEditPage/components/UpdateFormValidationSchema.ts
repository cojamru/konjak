import * as Yup from 'yup';

export const UpdateFormValidationSchema = Yup.object().shape({
  title: Yup.string().required('Please enter title'),
  description: Yup.string().required('Please enter description'),
  links: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Enter title'),
      url: Yup.string().required('Enter url'),
    }),
  ),
  artists: Yup.array().of(
    Yup.object().shape({
      nickname: Yup.string().required('Enter nickname'),
    }),
  ),
  tracks: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Enter title'),
      description: Yup.string().required('Enter description'),
      featured: Yup.array().of(
        Yup.object().shape({
          nickname: Yup.string().required('Enter nickname'),
        }),
      ),
    }),
  ),
});
