import { IoCalendarOutline } from "react-icons/io5";
import { FaDog } from "react-icons/fa";
import { VscSymbolFile } from "react-icons/vsc";

const GrommerTotalRequest = ({
  profileImage,
  nickname,
  closingDate,
  beautyDate,
  breed,
  dogGender,
  dogWeight,
  requestContent
}) => {
  return (
    <article className="my-4 rounded-xl bg-white p-5">
      <div className="mb-3 flex">
        <div className="mr-2">
          <img src={profileImage} alt="customer profile Image" className="h-[60px] w-[60px]" />
        </div>
        <div className="flex grow flex-col justify-center">
          <span className="text-lg">{nickname} 고객님</span>
          <span className="rounded-md bg-main-100 pl-2 text-sm text-main">{closingDate}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <IoCalendarOutline size={20} className="mr-2" />
          <span>{beautyDate}</span>
        </div>
        <div className="my-1 flex items-center">
          <FaDog size={20} className="mr-2" />
          <span>
            {breed} {dogGender} {dogWeight}Kg
          </span>
        </div>
        <div className="flex items-center">
          <VscSymbolFile size={20} className="mr-2" />
          <span>{requestContent}</span>
        </div>
      </div>
    </article>
  );
};

export default GrommerTotalRequest;
