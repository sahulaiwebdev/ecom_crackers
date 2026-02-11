import { NextRequest, NextResponse } from 'next/server';

// Verify webhook token
const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_TOKEN || 'firecracker_webhook_token';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify webhook
  if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
    console.log('✓ Webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Webhook verification failed' }, { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle incoming messages and status updates
    if (body.object === 'whatsapp_business_account') {
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];

        for (const change of changes) {
          const value = change.value;

          // Handle incoming messages
          if (value.messages) {
            for (const message of value.messages) {
              await handleIncomingMessage(message, value.contacts);
            }
          }

          // Handle message status updates
          if (value.statuses) {
            for (const status of value.statuses) {
              await handleMessageStatus(status);
            }
          }
        }
      }
    }

    return NextResponse.json({ status: 'received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

async function handleIncomingMessage(message: any, contacts: any) {
  const phoneNumber = message.from;
  const messageId = message.id;
  const timestamp = message.timestamp;
  const contact = contacts?.[0];
  const contactName = contact?.profile?.name || phoneNumber;

  console.log(`[WhatsApp] Incoming message from ${contactName} (${phoneNumber})`);

  let messageContent = '';
  if (message.type === 'text') {
    messageContent = message.text.body;
  } else if (message.type === 'button') {
    messageContent = `Button: ${message.button.text}`;
  } else if (message.type === 'interactive') {
    messageContent = `Interactive: ${message.interactive.type}`;
  }

  // TODO: Save incoming message to database
  // TODO: Route to appropriate handler (e.g., lead follow-up, order inquiry)
  
  console.log(`Message content: ${messageContent}`);

  // Auto-reply example
  // await sendWhatsAppMessage(phoneNumber, 'Thank you for your message. Our team will respond shortly.');
}

async function handleMessageStatus(status: any) {
  const messageId = status.id;
  const statusType = status.status; // sent, delivered, read, failed
  const timestamp = status.timestamp;

  console.log(`[WhatsApp] Message ${messageId} - Status: ${statusType}`);

  // TODO: Update message status in database
  // This is useful for tracking delivery and read receipts
}

// Helper function to send WhatsApp message
async function sendWhatsAppMessage(phoneNumber: string, message: string) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'text',
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
}
