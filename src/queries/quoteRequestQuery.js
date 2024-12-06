const dogList = [
  {
    dogId: 1,
    dogName: "바우",
    profileImage: "https://picsum.photos/200"
  },
  {
    dogId: 2,
    dogName: "초코",
    profileImage: "https://picsum.photos/200"
  },
  {
    dogId: 3,
    dogName: "네모",
    profileImage: "https://picsum.photos/200"
  }
];

const dogInfo = {
  dogId: 1,
  breed: "포메라니안",
  name: "두부",
  image: "https://picsum.photos/200",
  weight: "2.1kg",
  age: 5,
  dogGender: "MALE",
  neutering: false,
  experience: false,
  significant: "과하게 용맹해요"
};

const getDogList = async () => {
  return dogList;
};

const getDogInfo = async (dogId) => {
  return dogInfo;
};

export { getDogList, getDogInfo };
