import logo from "/Logo/logoBtn.png";
const EmptyPage = ({ content }) => {
  // [x] GroomerHome
  // [x] GroomerQuote
  // [x] GroomerStore
  // [x] BookmakredStore
  // [x] MyStore
  return (
    <div className="flex h-[calc(100vh-var(--header-height)-var(--bottom-bar-height))] flex-col items-center justify-center bg-main-100">
      <img src={logo} alt="Logo" className="mx-auto w-1/3" />
      <span className="mt-2 text-lg">{content}</span>
    </div>
  );
};

export default EmptyPage;
