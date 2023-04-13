"use client";

import Select from "react-select";
import { useCountries } from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latLng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue | null) => void;
};

export const CountrySelect = (props: CountrySelectProps) => {
  const countries = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={countries.getAll()}
        value={props.value}
        onChange={(value) => {
          props.onChange(value);
        }}
        formatOptionLabel={(option) => {
          return (
            <div className="flex items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},{" "}
                <span className="text-neutral-500 mt-1">{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => {
          return {
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#ffe4e6",
            },
          };
        }}
      />
    </div>
  );
};
