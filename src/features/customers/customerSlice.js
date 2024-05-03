import { createSlice } from "@reduxjs/toolkit";
import { payload } from "../accounts/accountSlice";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createdCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        (state.fullName = action.payload.fullName),
          (state.nationalID = action.payload.nationalID),
          (state.createdAt = action.payload.createdAt);
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createdCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export function createdCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createdCustomer",
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }
// export function updateName(name) {
//   return {
//     type: "customer/updateName",
//     payload: name,
//   };
// }
export const { createdCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
