import { useEffect, useState } from "react";
import DefaultCustomerProfile from "/Icons/Default/userDefaultImg.svg";
import DefaultPetProfile from "/Icons/Default/dogDefaultImg.svg";
import DefaultStoreProfile from "/Icons/Default/storeDefaultImg.svg";
import { useLocation } from "react-router-dom";

const ProfileImage = ({ formData, setFormData, onlyRead = false }) => {
  const location = useLocation();
  const [imagePreview, setImagePreview] = useState(null);
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    if (formData?.profileImage) {
      setIsDefault(false);
    } else {
      setIsDefault(true);
    }

    if (location.pathname.includes("mystore") || location.pathname.includes("store")) {
      setImagePreview(formData?.profileImage ? formData?.profileImage : DefaultStoreProfile);
    } else if (location.pathname.includes("info")) {
      setImagePreview(formData?.profileImage ? formData?.profileImage : DefaultCustomerProfile);
    } else {
      setImagePreview(formData?.profileImage ? formData?.profileImage : DefaultPetProfile);
    }
  }, [formData?.profileImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsDefault(false);
    }
  };

  // 이미지 클릭 시 input 클릭 트리거
  const handleImageClick = () => {
    document.getElementById("profile_image_input").click();
  };

  // 기본 이미지 초기화
  const handleResetImage = () => {
    if (location.pathname.includes("mystore")) {
      setImagePreview(DefaultStoreProfile);
    } else if (location.pathname.includes("info")) {
      setImagePreview(DefaultCustomerProfile);
    } else {
      setImagePreview(DefaultPetProfile);
    }
    setIsDefault(true);
  };

  return (
    <div className="mx-auto">
      {!onlyRead && (
        <input
          type="file"
          id="profile_image_input"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
      <div className="mx-auto mb-10 mt-20 flex flex-col items-center justify-center">
        <img
          src={imagePreview}
          alt="Default Image"
          onClick={handleImageClick}
          className={`${!isDefault && "img-border"} h-[100px] w-1/4`}
        />

        {!isDefault && (
          <button onClick={handleResetImage} className="mt-2 text-sm text-gray-300">
            기본 이미지로 변경
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
