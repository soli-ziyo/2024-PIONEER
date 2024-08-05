import { create } from "zustand";
import axios from "axios";
import instance from "../api/axios";

export const useProfilesStore = create((set) => ({
  profiles: [],
  fetchProfiles: async () => {
    try {
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/home/main`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log(response);

      const profiles = response.data.map((profile) => ({
        user_id: profile.user_id,
        nickname: profile.nickname,
        profile: profile.profile
          ? `${process.env.REACT_APP_SERVER_PORT}${profile.profile}`
          : require("../images/Basic.png"),
        content: profile.content || "",
        emoji: profile.emoji || "",
      }));

      set({ profiles });
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);

      set({
        profiles: [
          {
            user_id: 1,
            nickname: "엄마",
            profile: require("../images/mom.png"),
            content: "오늘 하루는 어땠니?",
            emoji: "😊",
          },
        ],
      });
    }
  },
}));
