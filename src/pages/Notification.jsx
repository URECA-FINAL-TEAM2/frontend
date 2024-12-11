import SubHeader from "../components/common/SubHeader";
import { GoDotFill } from "react-icons/go";

const Notification = () => {
  return (
    <div>
      <SubHeader title={"알림"} />

      <div className="bg-white p-4">
        <div className="mt-20 px-4 py-4">
          <div className="flex flex-col border-b border-gray-300 pb-4">
            {/* 알림 제목+날짜 */}
            <div className="mb-2 flex items-center">
              <span className="mr-2 rounded-md bg-main-200 px-2 py-1 text-xs text-main-500">알림</span>
              <span className="ml-auto text-right text-xs text-gray-400">2024.12.11 17:11</span>
            </div>
            {/* 알림 내용 */}
            <div className="mt-1 inline-flex items-center">
              <GoDotFill color="red" />
              <span className="ml-1 font-semibold text-gray-900">문경 디자이너님이 견적을 보냈습니다.</span>
            </div>
            <div className="mt-2">
              <p className="ml-5 text-xs text-gray-500">견적 내용을 자세히 확인해보세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
