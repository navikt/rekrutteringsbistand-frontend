import { redirect } from 'next/navigation';

export default function LoggutPage() {
  redirect('/oauth2/logout?redirect=/');
}
