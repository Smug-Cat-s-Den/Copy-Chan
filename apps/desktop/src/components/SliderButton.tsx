import { Dispatch, SetStateAction } from "react";

interface props {
  value: boolean;
  SetValue: Dispatch<SetStateAction<boolean>>;
  DoSomthing?: () => void | Promise<void>;
}

export const SliderButton = ({ value, SetValue, DoSomthing }: props) => {
  return (
    <button
      className={`${
        value ? "bg-blue-500" : " bg-blue-500/50"
      }   p-2 transition-colors ease-in-out duration-200 rounded-4xl w-12 h-7 relative drop-shadow-2xl`}
      onClick={() => {
        SetValue(!value);
        DoSomthing && DoSomthing();
      }}
    >
      <div
        className={`absolute w-5 h-5 m-1 bg-blue-200 hover:bg-blue-100 ${
          !value ? "left-0" : "right-0"
        } top-0 rounded-full drop-shadow-2xl`}
      />
    </button>
  );
};
