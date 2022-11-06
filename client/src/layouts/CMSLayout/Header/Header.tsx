type PropsType = {
  ClassName: string;
};

const CMSLayoutHeader: React.FC<PropsType> = props => {
  const { ClassName } = props;

  return <div className={ClassName}>Header</div>;
};

export default CMSLayoutHeader;
