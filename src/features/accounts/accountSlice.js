import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
  isloading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isloading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        (state.loan = action.payload.amount),
          (state.loanPurpose = action.payload.purpose),
          (state.balance = state.balance + action.payload.amount);
      },
    },

    payload(state) {
      (state.balance = state.balance - state.loan),
        (state.loan = 0),
        (state.loanPurpose = "");
    },
    convertedCurrency(state) {
      state.isloading = true;
    },
  },
});

export function deposit(amount, currency) {
  console.log("first");
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getstate) {
    dispatch({ type: "account/convertedCurrency" });
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    dispatch(deposit(data.rates.USD, "USD"));
  };
}
export const { withdraw, payload, requestLoan } = accountSlice.actions;
export default accountSlice.reducer;

// export default function accountReducer(state , action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;

//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payload":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };

//     default:
//       return state;
//   }
// }

// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function payload() {
//   return { type: "account/payload" };
// }
