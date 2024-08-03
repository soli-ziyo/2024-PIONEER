import create from "zustand";
import axios from "axios";

const useFamilyStore = create((set) => ({
  familycode: "",
  setFamilycode: (code) => set({ familycode: code }),
  submitFamilycode: async (familycode) => {
    const baseurl = "https://minsol.pythonanywhere.com/";
    try {
      const response = await axios.post(
        `${baseurl}family/create/`,
        { familycode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      localStorage.setItem("familycode", response.data.data.familycode);
      console.log("ddd");
      console.log(response.data.data.familycode);
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
      const response = await axios.get(`/report/calendar/${familycode}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching family data:", error);
      throw error;
    }
  },
}));

export default useFamilyStore;
