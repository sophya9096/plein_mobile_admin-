// import { useCallback, useReducer } from "react";

// const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
// const SET_DATA = "SET_DATA";
// const SET_REF = "SET_REF";

// const formReducer = (state, action) => {
//   if (action.type === FORM_INPUT_UPDATE) {
//     let formIsValid = true;
//     for (const inputId in state.inputs) {
//       if (!state.inputs[inputId]) {
//         continue;
//       }
//       if (inputId === action.inputId) {
//         formIsValid = formIsValid && action.isValid;
//       } else {
//         formIsValid = formIsValid && state.inputs[inputId].isValid;
//       }
//     }
//     return {
//       ...state,
//       inputs: {
//         ...state.inputs,
//         [action.inputId]: {
//           value: action.value,
//           isValid: action.isValid,
//           isEmail: action.isEmail,
//           ref: state.inputs[action.inputId].ref,
//         },
//       },
//       isValid: formIsValid,
//     };
//   }
//   if (action.type === SET_REF) {
//     return {
//       ...state,
//       inputs: {
//         ...state.inputs,
//         [action.inputId]: {
//           value: state.inputs[action.inputId].value,
//           isValid: state.inputs[action.inputId].isValid,
//           value: state.inputs[action.inputId].value,
//           ref: action.ref,
//         },
//       },
//     };
//   }
//   if (action.type === SET_DATA) {
//     return {
//       inputs: action.inputs,
//       isValid: action.formIsValid,
//     };
//   }
//   return state;
// };

// export const useForm = (initialInput, initialFormValidity) => {
//   const [formState, dispatch] = useReducer(formReducer, {
//     inputs: initialInput,
//     isValid: initialFormValidity,
//   });

//   const inputHandler = useCallback((id, value, isValid, isEmail) => {
//     dispatch({
//       type: FORM_INPUT_UPDATE,
//       inputId: id,
//       value: value,
//       isValid: isValid,
//       isEmail,
//     });
//   }, []);

//   const getRef = useCallback((id, ref) => {
//     dispatch({
//       type: SET_REF,
//       inputId: id,
//       ref,
//     });
//   }, []);

//   const submitAllRefs = useCallback((inputs) => {
//     // console.log("submitAllRefs", inputs);
//     for (const input in inputs) {
//       console.log("object", inputs[input].ref.current.blur());
//       // inputs[input].ref.current;
//     }
//   }, []);

//   const setFormData = useCallback((inputData, formValidity) => {
//     dispatch({
//       type: SET_DATA,
//       inputs: inputData,
//       formIsValid: formValidity,
//     });
//   }, []);

//   return [formState, inputHandler, setFormData, getRef, submitAllRefs];
// };
