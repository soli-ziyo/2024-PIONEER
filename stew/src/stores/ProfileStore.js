import create from 'zustand';
import axios from 'axios';

const baseurl = 'https://minsol.pythonanywhere.com';

export const useProfilesStore = create((set) => ({
  profiles: [],
  fetchProfiles: async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${baseurl}/home/main/`, // 올바른 API 엔드포인트 사용
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // 응답을 처리하여 프로필 이미지를 올바르게 매핑
      const profiles = response.data.map((profile) => ({
        user_id: profile.user_id,
        nickname: profile.nickname,
        profile: profile.profile ? `${baseurl}${profile.profile}` : require('../images/me.jpg'),
        content: profile.content || "",
        emoji: profile.emoji || ""
      }));

      set({ profiles });
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);

      // 오프라인 또는 오류 시 임시 데이터 사용
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
