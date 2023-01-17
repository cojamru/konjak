/* eslint-disable react/no-array-index-key */
/* eslint-disable no-prototype-builtins */

import dayjs from 'dayjs';
import { withFormik } from 'formik';

import { GameCreateFormValuesType, UpdateGameFormValuesType } from '../GameEditPageTypes';

import { CreateFormValidationSchema } from './CreateFormValidationSchema';
import { CreateGameInnerForm } from './GameCreateInnerForm';
import { UpdateGameInnerForm } from './GameUpdateInnerForm';
import { UpdateFormValidationSchema } from './UpdateFormValidationSchema';

type GameCreatePropsType = {
  handleSubmit: (values: GameCreateFormValuesType) => void;
};

type GameUpdatePropsType = Partial<UpdateGameFormValuesType> & {
  handleSubmit: (values: UpdateGameFormValuesType) => void;
};

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

  validationSchema: CreateFormValidationSchema,
})(CreateGameInnerForm);

export const GameEditForm = withFormik<GameUpdatePropsType, UpdateGameFormValuesType>({
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
  mapPropsToValues,

  validateOnChange: true,
  validationSchema: UpdateFormValidationSchema,
})(UpdateGameInnerForm);
