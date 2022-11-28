import { Button, Form, Input, message } from 'antd';
import { handle } from 'oazapfts';
import { useLocation, useNavigate } from 'react-router-dom';

import api from 'src/api';
import { Navigation } from 'src/constants';
import { useAuth } from 'src/hooks';

import { logoImage } from '../../assets';

import style from './AuthPage.module.scss';

export const AuthPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const Navigate = useNavigate();
  const Location = useLocation();

  const { signIn } = useAuth();

  const FromPage = Location.state?.from?.pathname || Navigation.main;

  const onFinish = (values: any) => {
    handle(
      api.signInAuthSignInPost({
        username: values.username,
        password: values.password,
      }),
      {
        200() {
          handle(api.getUserAuthUserGet(), {
            200(response) {
              signIn(response);
              Navigate(FromPage);
            },
          });
        },
        401(response) {
          messageApi.open({
            type: 'error',
            content: response.detail,
          });
        },
        422() {
          //
        },
      },
    );
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
