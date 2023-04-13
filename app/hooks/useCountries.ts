import countries from "world-countries";

const formattedCountries = countries.map((c) => {
  return {
    value: c.cca2,
    label: c.name.common,
    flag: c.flag,
    latLng: c.latlng,
    region: c.region,
  };
});

export function useCountries() {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) =>
    formattedCountries.find((c) => c.value === value);

  return {
    getAll,
    getByValue,
  };
}
