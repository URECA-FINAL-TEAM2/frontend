const Logout = () => {
  const handleLogout = async () => {
    console.log("로그아웃 구현 필요");
  };

  return (
    <button className="mx-auto flex py-4 text-sm text-gray-300 underline" onClick={handleLogout}>
      <li>로그아웃</li>
    </button>
  );
};

export default Logout;
