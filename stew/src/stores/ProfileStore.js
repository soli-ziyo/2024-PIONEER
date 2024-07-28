import create from 'zustand';

export const useProfilesStore = create((set) => ({
  profiles: [
    {
      name: "엄마",
      image: require('../images/mom.png'),
      status: "오늘 하루는 어땠니?",
      emoji: "😊"
    },
    {
      name: "아빠",
      image: require('../images/dad.png'),
      status: "여름 감기 조심",
      emoji: "😉"
    },
    {
      name: "나",
      image: require('../images/me.jpg'),
      status: "오늘 저녁 메뉴: 칼국수",
      emoji: "😋"
    }
  ],
}));
