import logo from "/Logo/doglogo.png";
const EmptyPage = ({ content }) => {
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center">
      <img src={logo} alt="Logo" className="mx-auto w-1/3" />
      <span className="mt-2 text-lg">{content}</span>
    </div>
  );
};

export default EmptyPage;
