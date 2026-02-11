import { ComplianceModule } from '@/components/Dashboard/compliance/compliance-module';

export const metadata = {
  title: 'License & Compliance | Admin Dashboard',
  description: 'Manage licenses, certifications, and regulatory compliance for firecracker sales',
};

export default function CompliancePage() {
  return <ComplianceModule />;
}
