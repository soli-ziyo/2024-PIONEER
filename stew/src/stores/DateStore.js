import { create } from "zustand";
import axios from "axios";

const baseurl = "https://minsol.pythonanywhere.com";

export const DateStore = create((set) => ({
  activityData: {},
  currentDate: new Date(),
  totalPosts: 0,
  temperature: 0,
  status: "차가운 스튜",

  setActivityData: (data) => set({ activityData: data }),
  setCurrentDate: (date) => set({ currentDate: date }),

  fetchData: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const familycode = localStorage.getItem("familycode");
      const response = await axios.get(
        `${baseurl}/report/calendar/${familycode}/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = response.data;

      // Set total posts
      const totalPosts = data.interests.find(
        (interest) => interest["총 게시물 수"] !== undefined
      )["총 게시물 수"];
      set({ totalPosts });

      // Set temperature and status
      const temperature = data.interests.find(
        (interest) => interest["stew_temp"] !== undefined
      )["stew_temp"];
      const status = data.interests.find(
        (interest) => interest["stew"] !== undefined
      )["stew"];
      set({ temperature, status });

      // Set activity data
      const tempActivityData = {};
      data.calendar.forEach((entry) => {
        const date = new Date(entry.date).getDate();
        tempActivityData[date] = entry.user_count;
      });
      set({ activityData: tempActivityData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
