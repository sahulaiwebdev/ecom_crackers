import { FirecrackerDashboard } from '@/components/Dashboard/firecracker-dashboard/dashboard';

export const metadata = {
  title: 'Firecracker Dashboard | Admin',
  description: 'Real-time dashboard with sales, leads, compliance, and inventory metrics',
};

export default function FirecrackerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Firecracker Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Real-time business metrics, compliance tracking, and performance analytics
        </p>
      </div>

      <FirecrackerDashboard />
    </div>
  );
}
