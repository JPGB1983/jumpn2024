export function formatAmount(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString();
}

export function getSubscriptionStatusColor(status: string): string {
  const colors = {
    active: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800',
    past_due: 'bg-yellow-100 text-yellow-800',
    incomplete: 'bg-gray-100 text-gray-800',
  };

  return colors[status as keyof typeof colors] || colors.incomplete;
}