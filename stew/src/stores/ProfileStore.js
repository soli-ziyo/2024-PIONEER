import create from 'zustand';
import axios from 'axios';

export const useProfilesStore = create((set) => ({
  profiles: [],
  fetchProfiles: async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://example.com/api/profiles/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      set({ profiles: response.data.data });
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);

      // 임시 데이터임
      set({
        profiles: [
          {
            user_id: 1,
            nickname: "엄마",
            profile: require('../images/mom.png'),
            content: "오늘 하루는 어땠니?",
            emoji: "😊"
          },
          {
            user_id: 2,
            nickname: "아빠",
            profile: require('../images/dad.png'),
            content: "여름 감기 조심",
            emoji: "😉"
          },
          {
            user_id: 3,
            nickname: "나",
            profile: require('../images/me.jpg'),
            content: "오늘 저녁 메뉴: 칼국수",
            emoji: "😋"
          }
        ]
      });
    }
  }
}));