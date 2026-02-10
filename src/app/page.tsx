import { redirect } from 'next/navigation';
import { DEFAULT_BRAND } from '@/config/brands';

/**
 * Root page redirects to the default brand
 * In production, domain detection handles brand routing.
 * This redirect is for development/preview environments.
 */
export default function RootPage() {
  redirect(`/${DEFAULT_BRAND}`);
}
