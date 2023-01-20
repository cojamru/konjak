/* eslint-disable react/no-array-index-key */
/* eslint-disable no-prototype-builtins */

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { FieldArray, FormikProps } from 'formik';

import { TextField, DatePickerField, TextAreaField } from 'src/components';

import { UpdateAlbumFormValuesType } from '../AlbumEditPageTypes';

import style from './AlbumEditForm.module.scss';

export const UpdateAlbumInnerForm = (props: FormikProps<UpdateAlbumFormValuesType>) => {
  const { values } = props;
  const { handleSubmit } = props;

  return (
    <Form className={style.editAlbumForm} labelCol={{ span: 4 }}>
      <Form.Item required label="Название">
        <TextField type="text" name="title" placeholder="Название" />
      </Form.Item>

      <Form.Item required label="Дата релиза">
        <DatePickerField allowClear={false} name="release_date" />
      </Form.Item>

      <Form.Item required label="Платформа">
        <TextField type="text" name="platform" placeholder="Платформа" />
      </Form.Item>

      <Form.Item required label="Описание">
        <TextAreaField rows={6} type="textArea" name="description" placeholder="Описание" />
      </Form.Item>

      <Form.Item className={style.editAlbumForm__links} label="Ссылки">
        <FieldArray
          name="links"
          render={arrayHelpers => (
            <div>
              {values.links?.map((link, key) => {
                return (
                  <div className={style.editAlbumForm__links__link} key={key}>
                    <div>
                      <TextField type="text" name={`links[${key}].title`} placeholder="Название" />
                    </div>

                    <div>
                      <TextField type="text" name={`links[${key}].url`} placeholder="URL" />
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

      <div className={style.editAlbumForm__actions}>
        <Button htmlType="submit" type="primary" onClick={() => handleSubmit()}>
          Обновить
        </Button>
      </div>
    </Form>
  );
};
