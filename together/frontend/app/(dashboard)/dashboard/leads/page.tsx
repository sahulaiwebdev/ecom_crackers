import { LeadsManagement } from '@/components/Dashboard/leads/leads-management';

export const metadata = {
  title: 'Lead Management | Admin Dashboard',
  description: 'Manage firecracker sales leads and convert to orders',
};

export default function LeadsPage() {
  return <LeadsManagement />;
}
