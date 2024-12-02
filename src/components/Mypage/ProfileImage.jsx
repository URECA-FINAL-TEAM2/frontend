import { useEffect, useState } from "react";
import DefaultCustomerProfile from "/Icons/DefaultCustomerProfile.svg";
import DefaultPetProfile from "/Icons/DefaultPetProfile.svg";
import DefaultStoreProfile from "/Icons/DefaultStoreProfile.svg";

const ProfileImage = ({ setFormData, onlyRead = false }) => {
  const [imagePreview, setImagePreview] = useState(DefaultCustomerProfile);
  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    if (location.pathname.includes("store")) {
      setImagePreview(DefaultStoreProfile);
    } else if (location.pathname.includes("pet")) {
      setImagePreview(DefaultPetProfile);
    } else {
      setImagePreview(DefaultCustomerProfile);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_image: file }));
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
    setImagePreview(DefaultCustomerProfile);
    setIsDefault(true);
  };

  return (
    <div className="mx-auto">
      {!onlyRead && (
        <input
          type="file"
          id="profile_image_input"
          name="profile_image"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
      <div className="mx-auto mb-16 mt-24 flex flex-col items-center justify-center">
        <img src={imagePreview} alt="Default Image" onClick={handleImageClick} className="img-border h-[100px] w-1/4" />

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
