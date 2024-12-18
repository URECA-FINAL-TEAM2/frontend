import { formatDate } from "@/queries/mainQuery";
import { Schedule, Corgi, Note } from "/public/Icons";

const GrommerTotalRequest = ({ request }) => {
  return (
    <div className="my-4 rounded-xl bg-white p-5 shadow-lg">
      <div className="mb-3 flex">
        <img src={request.profileImage} alt="고객 프로필" className="mr-3 h-10 w-10 rounded-lg object-cover" />
        <div>
          <p className="px-0.5 font-semibold leading-[1.1]">{request.userName} 고객님</p>
          <span className="rounded-md bg-main-100 px-1 py-[1px] text-xs text-main">
            {formatDate(request.closingDate)}까지
          </span>
        </div>
      </div>
      <div className="mb-2 text-sm">
        <div className="mb-1 flex items-center">
          <img src={Schedule} alt="Description" className="mr-2 h-5 w-5" />
          <p>{formatDate(request.beautyDate)}</p>
        </div>
        <div className="mb-1 flex items-center">
          <img src={Corgi} alt="Description" className="mr-2 h-5 w-5" />
          <p>
            {request.breed} • {request.dogGender == "MALE" ? "남아" : "여아"} • {request.dogWeight}kg
          </p>
        </div>
        <div className="flex items-center">
          <img src={Note} alt="Description" className="mr-2 h-5 w-5" />
          <p className="line-clamp-1">{request.requestContent}</p>
        </div>
      </div>
    </div>
  );
};

export default GrommerTotalRequest;
