import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLaon":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payload":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createdCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function requestLaon(amount, purpose) {
  return {
    type: "account/requestLaon",
    payload: { amount, purpose },
  };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function payload() {
  return { type: "account/payload" };
}
function createdCustomer(fullName, nationalID) {
  return {
    type: "customer/createdCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
function updateName(name) {
  return {
    type: "customer/updateName",
    payload: name,
  };
}

store.dispatch(deposit(5000));
store.dispatch(requestLaon(540000, "buy home"));
store.dispatch(createdCustomer("ali alizade", "34"));
store.dispatch(updateName("masoud"));
console.log("hi redux");
console.log(store.getState());
