export const formatDate = (date: Date | string | null): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const getCurrentDate = (): string => {
  return formatDate(new Date());
};

export const getMaxDate = (years: number = 10): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return formatDate(date);
};

export const getMinDate = (years: number = 100): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return formatDate(date);
};

export const isValidDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};