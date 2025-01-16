type TitleProps = {
  children: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return <h1 className="text-5xl font-bold mb-6">{children}</h1>;
};

export default Title;
