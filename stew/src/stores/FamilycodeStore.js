import { create } from "zustand";
import instance from "../api/axios";

export const useFamilycodeStore = create((set) => ({
  familycode: "",
  fetchFamilycode: async () => {
    try {
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/family/code/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data.familycode);
      const familycode = response.data.familycode;
      set({ familycode });
    } catch (err) {
      console.error(err);
    }
  },
}));
