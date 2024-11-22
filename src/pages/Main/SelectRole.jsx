const SelectRole = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main-300 text-white">
      <div className="text-2xl">어떤 서비스를 원하시나요?</div>

      <div>
        <button>고객</button>
        <button>미용사</button>
      </div>
    </div>
  );
};

export default SelectRole;
