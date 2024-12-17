import logo from "/Logo/logoBtn.png";
const EmptyPage = ({ content }) => {
  return (
    <div className="flex h-[95vh] flex-col items-center justify-center bg-main-100">
      <img src={logo} alt="Logo" className="mx-auto w-1/3" />
      <span className="mt-2 text-lg">{content}</span>
    </div>
  );
};

export default EmptyPage;
