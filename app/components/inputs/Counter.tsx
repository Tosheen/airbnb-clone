"use client";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type CounterProps = {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
};

export const Counter = (props: CounterProps) => {
  const { title, subTitle, value, onChange } = props;

  const onAdd = () => {
    onChange(value + 1);
  };

  const onReduce = () => {
    onChange(value >= 2 ? value - 1 : 1);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subTitle}</div>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <div className="flex items-center gap-4">
          <button
            onClick={onReduce}
            className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 transition"
          >
            <AiOutlineMinus size={20} />
          </button>
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div className="flex items-center gap-4">
          <button
            onClick={onAdd}
            className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 transition"
          >
            <AiOutlinePlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
