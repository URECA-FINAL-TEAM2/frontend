const NicknameCheck = ({ nickname }) => {
  return (
    <>
      {nickname === "possible" && (
        <div className="mx-auto mb-5 w-3/4 text-xs text-[green]">사용가능한 닉네임입니다.</div>
      )}
      {nickname === "duplication" && (
        <div className="mx-auto mb-5 w-3/4 text-xs text-[red]">이미 사용 중인 닉네임입니다.</div>
      )}
      {nickname === "impossible" && (
        <div className="mx-auto mb-5 w-3/4 text-xs text-[red]">2~10자 이내, 문자 포함이어야 합니다.</div>
      )}
      {nickname === "required" && <div className="mx-auto mb-5 w-3/4 text-xs text-[red]">닉네임을 입력해주세요</div>}
    </>
  );
};

export default NicknameCheck;
