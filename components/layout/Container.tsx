const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={containerStyles}>{children}</div>;
};

export default Container;

const containerStyles = 'max-w-[1920px] w-full mx-auto px-4 py-4 xl:px-20';
