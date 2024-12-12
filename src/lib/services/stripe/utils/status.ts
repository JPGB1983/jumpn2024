export const SUBSCRIPTION_STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  canceled: 'bg-red-100 text-red-800',
  past_due: 'bg-yellow-100 text-yellow-800',
  incomplete: 'bg-gray-100 text-gray-800',
} as const;

export function getStatusColor(status: string): string {
  return SUBSCRIPTION_STATUS_COLORS[status as keyof typeof SUBSCRIPTION_STATUS_COLORS] 
    || SUBSCRIPTION_STATUS_COLORS.incomplete;
}

export function formatStatus(status: string): string {
  const formattedStatus = {
    active: 'Active',
    canceled: 'Canceled',
    past_due: 'Past Due',
    incomplete: 'Incomplete',
    incomplete_expired: 'Expired',
    trialing: 'Trial',
    unpaid: 'Unpaid'
  };

  return formattedStatus[status as keyof typeof formattedStatus] || status;
}