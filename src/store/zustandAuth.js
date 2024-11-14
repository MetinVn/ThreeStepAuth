import { create } from "zustand";

const zustandCreate = create((set) => ({
  email: "",
  password: "",
  otpValid: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setOtpValid: (isValid) => set({ otpValid: isValid }),
}));

export default zustandCreate;
