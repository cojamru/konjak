/* eslint-disable react/no-array-index-key */
/* eslint-disable no-prototype-builtins */

import dayjs from 'dayjs';
import { withFormik } from 'formik';

import { AlbumCreateFormValuesType, UpdateAlbumFormValuesType } from '../AlbumEditPageTypes';

import { CreateAlbumInnerForm } from './AlbumCreateInnerForm';
import { UpdateAlbumInnerForm } from './AlbumUpdateInnerForm';
import { CreateFormValidationSchema } from './CreateFormValidationSchema';
import { UpdateFormValidationSchema } from './UpdateFormValidationSchema';

type AlbumCreatePropsType = {
  handleSubmit: (values: AlbumCreateFormValuesType) => void;
};

type AlbumUpdatePropsType = Partial<UpdateAlbumFormValuesType> & {
  handleSubmit: (values: UpdateAlbumFormValuesType) => void;
};

const mapPropsToValues = props => {
  return {
    title: props.title || '',
    description: props.description || '',
    release_date: props.release_date || dayjs(new Date()).format('YYYY-MM-DD'),
    tracks: props.tracks || [
      {
        title: '',
        description: '',
        featured: [
          {
            nickname: '',
          },
        ],
      },
    ],
    artists: props.artists || [
      {
        nickname: '',
      },
    ],
    links: props.links || [{ title: '', url: '' }],
  };
};

export const AlbumCreateForm = withFormik<AlbumCreatePropsType, AlbumCreateFormValuesType>({
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
  validateOnChange: true,

  enableReinitialize: true,
  mapPropsToValues: () => {
    return {
      title: '',
      description: '',
      release_date: dayjs(new Date()).format('YYYY-MM-DD'),
      slug: '',
      tracks: [
        {
          title: '',
          description: '',
          featured: [
            {
              nickname: '',
            },
          ],
        },
      ],
      artists: [
        {
          nickname: '',
        },
      ],
      links: [{ title: '', url: '' }],
    };
  },

  validationSchema: CreateFormValidationSchema,
})(CreateAlbumInnerForm);

export const AlbumEditForm = withFormik<AlbumUpdatePropsType, UpdateAlbumFormValuesType>({
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
  mapPropsToValues,

  validateOnChange: true,
  validationSchema: UpdateFormValidationSchema,
})(UpdateAlbumInnerForm);
