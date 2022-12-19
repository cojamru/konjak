import { useRef } from 'react';

import { Modal } from 'antd';
import { FormikProps } from 'formik';

import { useCreateGame } from 'src/hooks/useCreateGame';

import { EditGameForm } from './EditGameForm';
import style from './EditGameModal.module.scss';
import { EditGameFormValuesType } from './EditGameModalTypes';

type PropsType = {
  isOpen: boolean;
  close: () => void;
};

export const EditGameModal: React.FC<PropsType> = props => {
  const { isOpen, close } = props;

  const { mutate, data } = useCreateGame();

  const formRef = useRef<FormikProps<EditGameFormValuesType>>(null);

  const create = (params: EditGameFormValuesType) => {
    mutate({
      title: params.title,
      release_date: '14242',
      platform: params.platform,
      slug: params.slug,
      links: [],
    });
  };

  return (
    <Modal
      className={style.editGameModal}
      title="Создать игру"
      open={isOpen}
      onOk={() => {
        if (formRef.current) {
          formRef.current.handleSubmit();
        }
      }}
      onCancel={close}
    >
      <EditGameForm innerRef={formRef} handleSubmit={create} />
    </Modal>
  );
};
