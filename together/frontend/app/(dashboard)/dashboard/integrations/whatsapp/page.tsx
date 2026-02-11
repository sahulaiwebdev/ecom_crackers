import { WhatsAppIntegration } from '@/components/Dashboard/integration/whatsapp-integration';

export const metadata = {
  title: 'WhatsApp Integration | Admin',
  description: 'Configure WhatsApp Business API for quotations and order notifications',
};

export default function WhatsAppPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">WhatsApp Integration</h1>
        <p className="text-muted-foreground mt-2">
          Send quotations and order notifications via WhatsApp Business API
        </p>
      </div>

      <WhatsAppIntegration />
    </div>
  );
}
