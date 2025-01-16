type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="text-white flex items-center justify-center overflow-hidden md:min-h-[85vh] min-h-[75vh]">
      <div className="text-center">{children}</div>
    </div>
  );
};

export default Container;
