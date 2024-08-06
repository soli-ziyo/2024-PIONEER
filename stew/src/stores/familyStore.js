import { create } from "zustand";
import instance from "../api/axios";

const useFamilyStore = create((set) => ({
  familycode: "",
  setFamilycode: (code) => set({ familycode: code }),
  submitFamilycode: async (familycode) => {

    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}family/create/`,
        { familycode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 400) {
        throw new Error("이미 가족에 속해있습니다.");
      } else {
        throw new Error(err.response ? err.response.data : err.message);
      }
    }
  },
  fetchFamilyData: async (accessToken, familycode) => {
    try {
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/report/calendar/${familycode}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching family data:", error);
      throw error;
    }
  },
}));

export default useFamilyStore;
