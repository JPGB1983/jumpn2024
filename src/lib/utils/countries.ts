export const getCountryName = (code: string): string => {
  const countries = {
    'us': 'United States',
    'uk': 'United Kingdom',
    'de': 'Germany',
    'fr': 'France',
    'it': 'Italy',
    'es': 'Spain',
    'pt': 'Portugal',
    'pl': 'Poland',
    'sg': 'Singapore'
  };

  return countries[code as keyof typeof countries] || code;
};