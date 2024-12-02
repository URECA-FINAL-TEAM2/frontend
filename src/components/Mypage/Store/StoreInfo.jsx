const StoreInfo = () => {
  return (
    <div className="mt-10">
      <div>
        <div className="labelStyle">매장 명</div>
        <div className="inputStyle">뭉뭉이샵</div>
      </div>
      <div>
        <div className="labelStyle">매장 설명</div>
        <div className="inputStyle">뭉뭉이샵</div>
      </div>
      <div>
        <div className="labelStyle">매장 주소</div>
        <div className="inputStyle mb-2">주소</div>
        <div className="inputStyle">상세주소</div>
      </div>
      <div>
        <div className="labelStyle">운영 시간</div>
        <div className="inputStyle">뭉뭉이샵</div>
      </div>

      <div className="mt-12 text-center text-sm">
        <button type="button" onClick={() => console.log("매장 삭제하기")} className="text-gray-300 underline">
          매장 삭제하기
        </button>
      </div>
    </div>
  );
};

export default StoreInfo;
