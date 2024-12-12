import { auth } from '../config/firebase';

export async function getAuthToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No authenticated user');
  }
  
  const token = await user.getIdToken();
  return token;
}

// Agrega la función formatStatus
export function formatStatus(status: string): string {
  switch (status) {
    case 'pending':
      return 'Payment is pending';
    case 'completed':
      return 'Payment completed successfully';
    case 'failed':
      return 'Payment failed';
    default:
      return 'Unknown status';
  }
}
