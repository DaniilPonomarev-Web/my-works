export const convertDateFormat = (dateStr: string) => {
  if (!dateStr) return undefined;
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};
