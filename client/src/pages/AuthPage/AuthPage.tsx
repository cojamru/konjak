import { Button, Form, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { Navigation } from 'src/constants';
import { useAuth } from 'src/hooks';

import { logoImage } from '../../assets';

import style from './AuthPage.module.scss';
import { getUser, signInUser } from './Services';

export const AuthPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const Location = useLocation();

  const { signIn } = useAuth();

  const FromPage = Location.state?.from?.pathname || Navigation.main;

  const onFinish = (values: any) => {
    signInUser({
      username: values.username,
      password: values.password,
    }).then(response => {
      if (response.status === 200) {
        getUser().then(response => {
          signIn(response.data);
          navigate(FromPage);
        });
      } else {
        messageApi.open({
          type: 'error',
          content: response.data.detail?.toString(),
        });
      }
    });
  };

  return (
    <div className={style.authPage}>
      <div className={style.authPage__substrate}>
        {contextHolder}

        <img className={style.authPage__substrate__logo} width={150} src={logoImage} alt="Logo" />

        <Form className={style.authPage__substrate__form} onFinish={onFinish} autoComplete="off">
          <Form.Item name="username" rules={[{ required: true, message: '' }]}>
            <Input placeholder="Логин" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '' }]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
