/* eslint-disable react/no-array-index-key */
/* eslint-disable no-prototype-builtins */

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { ErrorMessage, FieldArray, FormikProps } from 'formik';

import style from '../GameEditForm.module.scss';
import { GameCreateFormValuesType } from '../GameEditPageTypes';

export const CreateGameInnerForm = (props: FormikProps<GameCreateFormValuesType>) => {
  const { touched, errors, values, handleBlur } = props;
  const { handleChange, handleSubmit, setFieldValue } = props;

  const { TextArea } = Input;

  return (
    <Form className={style.editGameForm} labelCol={{ span: 4 }}>
      <Form.Item name="basic" required label="Название">
        <div>
          <Input
            onBlur={handleBlur}
            status={errors.title && touched.title ? 'error' : ''}
            onChange={handleChange}
            value={values.title}
            name="title"
            placeholder="Название"
          />
          <ErrorMessage name="title" />
        </div>
      </Form.Item>

      <Form.Item required label="Дата релиза">
        <DatePicker
          onBlur={handleBlur}
          status={errors.release_date && touched.release_date ? 'error' : ''}
          allowClear={false}
          onChange={(__, dateString) => setFieldValue('release_date', dayjs(dateString).format('YYYY-MM-DD'))}
          value={dayjs(values.release_date)}
          name="release_date"
        />
      </Form.Item>

      <Form.Item required label="Платформа">
        <div>
          <Input
            onBlur={handleBlur}
            status={errors.platform && touched.platform ? 'error' : ''}
            onChange={handleChange}
            value={values.platform}
            name="platform"
            placeholder="Платформа"
          />
          <ErrorMessage name="platform" />
        </div>
      </Form.Item>

      <Form.Item required label="slug">
        <div>
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            status={errors.slug && touched.slug ? 'error' : ''}
            value={values.slug}
            name="slug"
            placeholder="slug"
          />
          <ErrorMessage name="slug" />
        </div>
      </Form.Item>

      <Form.Item required label="Описание">
        <div>
          <TextArea
            rows={6}
            onBlur={handleBlur}
            status={errors.description && touched.description ? 'error' : ''}
            onChange={handleChange}
            value={values.description}
            name="description"
            placeholder="Описание"
          />
          <ErrorMessage name="description" />
        </div>
      </Form.Item>

      <Form.Item className={style.editGameForm__links} label="Ссылки">
        <FieldArray
          name="links"
          render={arrayHelpers => (
            <div>
              {values.links?.map((link, key) => {
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
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                        status={isUrlHasError ? 'error' : ''}
                        name={`links[${key}].url`}
                        value={values.links[key].url}
                        placeholder="URL"
                      />
                      <ErrorMessage name={`links[${key}].url`} />
                    </div>

                    <Button htmlType="button" onClick={() => arrayHelpers.remove(key)} danger>
                      <DeleteOutlined />
                    </Button>
                  </div>
                );
              })}
              <Button onClick={() => arrayHelpers.push({ title: '', url: '' })}>
                <PlusOutlined />
              </Button>
            </div>
          )}
        />
      </Form.Item>

      <div className={style.editGameForm__actions}>
        <Button type="primary" onClick={() => handleSubmit()} htmlType="submit">
          Создать
        </Button>
      </div>
    </Form>
  );
};
