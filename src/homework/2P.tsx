/* Ваше завдання – додати типи для наступних елементів коду:

RequestStep: Це рядковий літерал.

State: Цей тип являє собою об'єкт з двома властивостями isRequestInProgress і RequestStep

Action: Це тип, що представляє можливі дії, які можуть бути відправлені до редюсера.

Дивіться код і опишіть для нього правильні типи.
*/

// import React, { useReducer } from "react";

// const initialState: State = {
//   isRequestInProgress: false,
//   requestStep: "idle",
// };

// function requestReducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "START_REQUEST":
//       return { ...state, isRequestInProgress: true, requestStep: "start" };
//     case "PENDING_REQUEST":
//       return { ...state, isRequestInProgress: true, requestStep: "pending" };
//     case "FINISH_REQUEST":
//       return { ...state, isRequestInProgress: false, requestStep: "finished" };
//     case "RESET_REQUEST":
//       return { ...state, isRequestInProgress: false, requestStep: "idle" };
//     default:
//       return state;
//   }
// }

// export function RequestComponent() {
//   const [requestState, requestDispatch] = useReducer(
//     requestReducer,
//     initialState
//   );

//   const startRequest = () => {
//     requestDispatch({ type: "START_REQUEST" });
//     // Імітуємо запит до сервера
//     setTimeout(() => {
//       requestDispatch({ type: "PENDING_REQUEST" });
//       // Імітуємо отримання відповіді від сервера
//       setTimeout(() => {
//         requestDispatch({ type: "FINISH_REQUEST" });
//       }, 2000);
//     }, 2000);
//   };

//   const resetRequest = () => {
//     requestDispatch({ type: "RESET_REQUEST" });
//   };

//   return (
//     <div>
//       <button onClick={startRequest}>Почати запит</button>
//       <button onClick={resetRequest}>Скинути запит</button>
//       <p>Стан запиту: {requestState.requestStep}</p>
//     </div>
//   );
// }

// export default RequestComponent;

// --------------------------------------------------------------

import React, { useReducer } from "react";

//* Тип для рядкових літералів, які представляють стани запиту
type RequestStep = "start" | "pending" | "finished" | "idle";

//* Тип для стану компонента
type State = {
  isRequestInProgress: boolean; //* Показник, чи триває запит
  requestStep: RequestStep; //* Поточний стан запиту
};

//* Тип для можливих дій, які можна відправити до редюсера
type Action =
  | { type: "START_REQUEST" }
  | { type: "PENDING_REQUEST" }
  | { type: "FINISH_REQUEST" }
  | { type: "RESET_REQUEST" };

const initialState: State = {
  isRequestInProgress: false,
  requestStep: "idle",
};

//* Редюсер для обробки дій та зміни стану
function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_REQUEST":
      //* Початок запиту - встановлення isRequestInProgress в true та requestStep в "start"
      return { ...state, isRequestInProgress: true, requestStep: "start" };
    case "PENDING_REQUEST":
      //* Запит у стані очікування - isRequestInProgress залишається true, а requestStep змінюється на "pending"
      return { ...state, isRequestInProgress: true, requestStep: "pending" };
    case "FINISH_REQUEST":
      //* Завершення запиту - isRequestInProgress встановлюється в false, а requestStep змінюється на "finished"
      return { ...state, isRequestInProgress: false, requestStep: "finished" };
    case "RESET_REQUEST":
      //* Скидання запиту - обидва isRequestInProgress та requestStep встановлюються в початковий стан "idle"
      return { ...state, isRequestInProgress: false, requestStep: "idle" };
    default:
      //* У випадку невідомої дії, повертаємо поточний стан
      return state;
  }
}

//* Компонент React, який використовує редюсер та стан для управління станом запиту
export function RequestComponent() {
  //* Використання useReducer для створення стану та функції dispatch
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  //* Функція, що імітує запит до сервера
  const startRequest = () => {
    requestDispatch({ type: "START_REQUEST" });

    //* Імітація отримання відповіді від сервера через певний час
    setTimeout(() => {
      requestDispatch({ type: "PENDING_REQUEST" });

      //* Імітація завершення запиту через ще якийсь час
      setTimeout(() => {
        requestDispatch({ type: "FINISH_REQUEST" });
      }, 2000);
    }, 2000);
  };

  //* Функція для скидання стану запиту
  const resetRequest = () => {
    requestDispatch({ type: "RESET_REQUEST" });
  };

  //* Повертаємо JSX, який містить кнопки для взаємодії та виведення стану запиту
  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
