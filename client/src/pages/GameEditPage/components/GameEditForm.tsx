/* eslint-disable react/no-array-index-key */
/* eslint-disable no-prototype-builtins */

import dayjs from 'dayjs';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { GameCreateFormValuesType, UpdateGameFormValuesType } from '../GameEditPageTypes';

import { UpdateGameInnerForm, CreateGameInnerForm } from './InnerForm';

type GameCreatePropsType = {
  handleSubmit: (values: GameCreateFormValuesType) => void;
};

type GameUpdatePropsType = Partial<UpdateGameFormValuesType> & {
  handleSubmit: (values: UpdateGameFormValuesType) => void;
};

const CreateFormSchema = Yup.object().shape({
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

const UpdateFormSchema = Yup.object().shape({
  title: Yup.string().required('Please enter title'),
  platform: Yup.string().required('Please enter platform'),
  description: Yup.string().required('Please enter description'),
  links: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Enter title'),
      url: Yup.string().required('Enter url'),
    }),
  ),
});

const mapPropsToValues = props => {
  return {
    title: props.title || '',
    platform: props.platform || '',
    description: props.description || '',
    release_date: props.release_date || dayjs(new Date()).format('YYYY-MM-DD'),
    links: props.links || [{ title: '', url: '' }],
  };
};

export const GameCreateForm = withFormik<GameCreatePropsType, GameCreateFormValuesType>({
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
  validateOnChange: true,

  enableReinitialize: true,
  mapPropsToValues: () => {
    return {
      title: '',
      platform: '',
      slug: '',
      description: '',
      release_date: dayjs(new Date()).format('YYYY-MM-DD'),
      links: [{ title: '', url: '' }],
    };
  },

  validationSchema: CreateFormSchema,
})(CreateGameInnerForm);

export const GameEditForm = withFormik<GameUpdatePropsType, UpdateGameFormValuesType>({
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
  mapPropsToValues,

  validateOnChange: true,
  validationSchema: UpdateFormSchema,
})(UpdateGameInnerForm);
