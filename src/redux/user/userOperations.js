import axios from "axios";

const instance = axios.create({
  baseURL: "https://goit-project-02-back-end.onrender.com", 
});

export const fetchUserData = async () => {
  try {
     const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); 

    const response = await instance.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Помилка отримання даних користувача:", error);
    throw error; 
  }
};