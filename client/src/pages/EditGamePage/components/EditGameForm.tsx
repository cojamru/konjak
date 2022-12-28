import { DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import { EditGameFormValuesType } from '../EditGamePageTypes';

import style from './EditGameForm.module.scss';

type PropsType = Partial<EditGameFormValuesType> & {
  handleSubmit: (values: EditGameFormValuesType) => void;
};

const InnerForm = (props: FormikProps<EditGameFormValuesType>) => {
  const { touched, errors, values } = props;
  const { handleChange, handleSubmit, setFieldValue } = props;

  const { TextArea } = Input;

  const addLink = () => {
    setFieldValue('links', [...values.links, { title: '', url: '' }]);
  };

  const removeLink = key => {
    setFieldValue('links', values.links.splice(key, 1));
  };

  return (
    <Form className={style.editGameForm} labelCol={{ span: 4 }}>
      <Form.Item label="Название">
        <Input onChange={handleChange} value={values.title} type="title" name="title" placeholder="Название" />
        {touched.title && errors.title && <div>{errors.title}</div>}
      </Form.Item>

      <Form.Item label="Дата релиза">
        <DatePicker
          allowClear={false}
          onChange={(date, dateString) => setFieldValue('releaseDate', dateString)}
          value={dayjs(values.release_date)}
          name="releaseDate"
        />
      </Form.Item>

      <Form.Item label="Платформа">
        <Input
          onChange={handleChange}
          value={values.platform}
          type="platform"
          name="platform"
          placeholder="Платформа"
        />
        {touched.platform && errors.platform && <div>{errors.platform}</div>}
      </Form.Item>

      <Form.Item label="slug">
        <Input onChange={handleChange} value={values.slug} type="slug" name="slug" placeholder="slug" />
        {touched.slug && errors.slug && <div>{errors.slug}</div>}
      </Form.Item>

      <Form.Item label="Описание">
        <TextArea
          rows={6}
          onChange={handleChange}
          value={values.description}
          name="description"
          placeholder="Описание"
        />
        {touched.description && errors.description && <div>{errors.description}</div>}
      </Form.Item>

      <Form.Item className={style.editGameForm__links} label="Ссылки">
        {values.links.map((link, key) => (
          <div className={style.editGameForm__links__link} key={key}>
            <Input
              onChange={event => {
                event.preventDefault();
                setFieldValue(`links.${key}.title`, event.target.value);
              }}
              value={values.links[key].title}
              placeholder="Название"
            />
            <Input
              onChange={event => {
                event.preventDefault();
                setFieldValue(`links.${key}.url`, event.target.value);
              }}
              value={values.links[key].url}
              placeholder="URL"
            />
            <Button onClick={removeLink} danger size="small">
              <DeleteOutlined />
            </Button>
          </div>
        ))}
      </Form.Item>
      <Button onClick={addLink}>Добавить ссылку</Button>

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
  title: Yup.string().required('Please enter notification title'),
  platform: Yup.string().required('Please enter notification platform'),
  slug: Yup.string().required('Please enter notification slug'),
  description: Yup.string().required('Please enter notification description'),
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

  validationSchema: FormSchema,

  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  },
})(InnerForm);
