import testImg from "/Test/dog.jpg";

const StorePortfolio = () => {
  return (
    <>
      <div className="mx-auto mt-5 grid h-[500px] w-11/12 grid-cols-3 gap-1 overflow-y-scroll">
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
        <img src={testImg} alt="Portfolio Img" />
      </div>
    </>
  );
};

export default StorePortfolio;
