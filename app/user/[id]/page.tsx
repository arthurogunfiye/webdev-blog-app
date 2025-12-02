type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { id } = params;
  // We can use the id to fetch user data from an API or database here
  return (
    <div>
      <h2>User Profile page under development...</h2>
      <p>User ID: {id}</p>
    </div>
  );
};

export default page;
