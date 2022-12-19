import { Table } from 'antd';

import type { GameType } from '../../GamesPageTypes';

import style from './GamesTable.module.scss';

type PropsType = {
  games: GameType[] | undefined;
};

export const GamesTable: React.FC<PropsType> = props => {
  const { games } = props;

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <Table className={style.gamesTable} dataSource={games} columns={columns} />;
};
