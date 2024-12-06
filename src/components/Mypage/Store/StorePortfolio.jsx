import testImg from "/Test/dog.jpg";

const StorePortfolio = () => {
  return (
    <>
      <div className="mx-auto mb-20 mt-5 grid w-11/12 grid-cols-3">
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
