import create from "zustand";
import axios from "axios";

export const DateStore = create((set) => ({
  activityData: {},
  currentDate: new Date(),
  familyMembersCount: 4,

  setActivityData: (data) => set({ activityData: data }),
  setCurrentDate: (date) => set({ currentDate: date }),

  fetchData: async (accessToken) => {
    try {
      // 수정된 더미 데이터
      const dummyData = {
        states: [
          { created_at: "2024-07-01T10:00:00Z" }, // 1일
          { created_at: "2024-07-03T11:00:00Z" }, // 3일
          { created_at: "2024-07-03T14:00:00Z" }, // 3일
          { created_at: "2024-07-03T16:00:00Z" }, // 3일
          { created_at: "2024-07-05T10:00:00Z" }, // 5일 - 3명 작성
          { created_at: "2024-07-05T11:00:00Z" }, // 5일 - 3명 작성
          { created_at: "2024-07-05T12:00:00Z" }, // 5일 - 3명 작성
          { created_at: "2024-07-08T10:00:00Z" }, // 8일 - 4명 작성
          { created_at: "2024-07-08T11:00:00Z" }, // 8일 - 4명 작성
          { created_at: "2024-07-08T12:00:00Z" }, // 8일 - 4명 작성
          { created_at: "2024-07-08T13:00:00Z" }, // 8일 - 4명 작성
          { created_at: "2024-07-20T10:00:00Z" }, // 20일 - 1명 작성
        ],
      };

      // 실제 API 호출 대신 더미 데이터 사용
      // const response = await axios.get(`/accounts/13/`, {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // });
      const response = { data: dummyData };

      const tempActivityData = {};
      response.data.states.forEach((state) => {
        const date = new Date(state.created_at).getDate();
        tempActivityData[date] = (tempActivityData[date] || 0) + 1;
      });
      set({ activityData: tempActivityData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
