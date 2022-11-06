type PropsType = {
  ClassName: string;
};

const CMSLayoutFooter: React.FC<PropsType> = props => {
  const { ClassName } = props;

  return <div className={ClassName}>Footer</div>;
};

export default CMSLayoutFooter;
