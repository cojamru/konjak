/* eslint-disable no-prototype-builtins */
import { useState } from 'react';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { ErrorMessage, FieldArray, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import { EditGameFormValuesType } from '../EditGamePageTypes';

import style from './EditGameForm.module.scss';

type PropsType = Partial<EditGameFormValuesType> & {
  handleSubmit: (values: EditGameFormValuesType) => void;
};

const InnerForm = (props: FormikProps<EditGameFormValuesType>) => {
  const { touched, errors, values } = props;
  const { handleChange, handleSubmit, setFieldValue } = props;

  const [maxLinkKey, setMaxLinkKey] = useState(0);

  const { TextArea } = Input;

  const addLink = () => {
    setFieldValue('links', [...values.links, { title: '', url: '' }]);
    setMaxLinkKey(+maxLinkKey);
  };

  const removeLink = key => {
    const currentValue = [...values.links];
    currentValue.splice(key, 1);

    setFieldValue('links', currentValue);
  };

  return (
    <Form className={style.editGameForm} labelCol={{ span: 4 }}>
      <Form.Item required label="Название">
        <Input onChange={handleChange} value={values.title} name="title" placeholder="Название" />
        <ErrorMessage name="title" />
      </Form.Item>

      <Form.Item required label="Дата релиза">
        <DatePicker
          allowClear={false}
          onChange={(date, dateString) => setFieldValue('release_date', dateString)}
          value={dayjs(values.release_date)}
          name="release_date"
        />
      </Form.Item>

      <Form.Item required label="Платформа">
        <Input
          onChange={handleChange}
          value={values.platform}
          type="platform"
          name="platform"
          placeholder="Платформа"
        />
        <ErrorMessage name="platform" />
      </Form.Item>

      <Form.Item required label="slug">
        <Input onChange={handleChange} value={values.slug} type="slug" name="slug" placeholder="slug" />
        <ErrorMessage name="slug" />
      </Form.Item>

      <Form.Item required label="Описание">
        <TextArea
          rows={6}
          onChange={handleChange}
          value={values.description}
          name="description"
          placeholder="Описание"
        />
        <ErrorMessage name="description" />
      </Form.Item>

      <Form.Item className={style.editGameForm__links} label="Ссылки">
        <FieldArray
          name="links"
          render={() => (
            <div>
              {values.links.map((link, key) => {
                const linksErrorStatus = errors.links?.[key];
                const linksTouchedStatus = touched.links?.[key];

                const isTitleHasError = linksErrorStatus?.hasOwnProperty('title') && linksTouchedStatus?.title;
                const isUrlHasError = linksErrorStatus?.hasOwnProperty('url') && linksTouchedStatus?.url;

                return (
                  <div className={style.editGameForm__links__link} key={key}>
                    <div>
                      <Input
                        status={isTitleHasError ? 'error' : ''}
                        onChange={event => {
                          setFieldValue(`links.${key}.title`, event.target.value);
                        }}
                        name={`links[${key}].title`}
                        value={values.links[key].title}
                        placeholder="Название"
                      />
                      <ErrorMessage name={`links[${key}].title`} />
                    </div>

                    <div>
                      <Input
                        onChange={event => {
                          setFieldValue(`links.${key}.url`, event.target.value);
                        }}
                        status={isUrlHasError ? 'error' : ''}
                        name={`links[${key}].url`}
                        value={values.links[key].url}
                        placeholder="URL"
                      />
                      <ErrorMessage name={`links[${key}].url`} />
                    </div>

                    <Button htmlType="button" onClick={() => removeLink(key)} danger>
                      <DeleteOutlined />
                    </Button>
                  </div>
                );
              })}
              <Button onClick={addLink}>
                <PlusOutlined />
              </Button>
            </div>
          )}
        />
      </Form.Item>

      <div className={style.editGameForm__actions}>
        <Button onClick={() => handleSubmit()} htmlType="submit">
          Создать и перейти к новой
        </Button>
        <Button onClick={() => handleSubmit()} htmlType="submit">
          Создать и продолжить редактирование
        </Button>
        <Button type="primary" onClick={() => handleSubmit()} htmlType="submit">
          Создать
        </Button>
      </div>
    </Form>
  );
};

const FormSchema = Yup.object().shape({
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

export const EditGameForm = withFormik<PropsType, EditGameFormValuesType>({
  mapPropsToValues: props => {
    return {
      title: props.title || '',
      platform: props.platform || '',
      slug: props.slug || '',
      description: props.description || '',
      release_date: props.release_date || dayjs(new Date()).format(),
      links: props.links || [{ title: '', url: '' }],
    };
  },
  validateOnChange: true,
  validationSchema: FormSchema,

  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
})(InnerForm);
