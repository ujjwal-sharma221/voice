import * as ct from "countries-and-timezones";

export const getCountryFromTimezone = (timeZone?: string) => {
  if (!timeZone) return null;

  const timezoneInfo = ct.getTimezone(timeZone);
  if (!timezoneInfo?.countries.length) return null;

  const countryCode = timezoneInfo.countries[0];
  const country = ct.getCountry(countryCode as string);

  return {
    countryCode,
    country: country?.name ?? countryCode,
  };
};

export function getCountryFlagUrl(countryCode: string) {
  return `https://flagcdn.com/w40/${countryCode.toLocaleLowerCase()}.png`;
}
