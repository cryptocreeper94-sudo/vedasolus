import crypto from 'crypto';

const ORBIT_BASE_URL = process.env.ORBIT_BASE_URL || 'https://orbitstaffing.io';
const ORBIT_API_KEY = 'dw_app_darkwavehealth';
const ORBIT_SECRET = process.env.DARKWAVEHEALTH_WEBHOOK_SECRET!;
const APP_NAME = 'VedaSolus';
const APP_CALLBACK_URL = process.env.REPLIT_DEV_DOMAIN 
  ? `https://${process.env.REPLIT_DEV_DOMAIN}/api/orbit/callback`
  : 'https://vedasolus.io/api/orbit/callback';

function generateSignature(payload: string): string {
  return crypto.createHmac('sha256', ORBIT_SECRET).update(payload).digest('hex');
}

async function orbitRequest(endpoint: string, data: any, method: 'POST' | 'GET' = 'POST'): Promise<any> {
  const body = method === 'POST' ? JSON.stringify(data) : undefined;
  const signature = body ? generateSignature(body) : generateSignature('');
  
  const response = await fetch(`${ORBIT_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Orbit-Api-Key': ORBIT_API_KEY,
      'X-Orbit-Signature': signature,
    },
    body,
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ORBIT API Error: ${response.status} - ${error}`);
  }
  
  return response.json();
}

export async function syncSubscriptionRevenue(params: {
  amount: number;
  description: string;
  productCode: string;
  stripeSubscriptionId: string;
  customerId?: string;
}): Promise<any> {
  return orbitRequest('/api/financial-hub/ingest', {
    sourceSystem: 'VedaSolus',
    sourceAppId: 'dw_app_darkwavehealth',
    eventType: 'revenue',
    grossAmount: params.amount,
    netAmount: params.amount,
    description: params.description,
    productCode: params.productCode,
    externalRef: params.stripeSubscriptionId,
    idempotencyKey: `vedasolus_${params.stripeSubscriptionId}_${Date.now()}`,
    metadata: { customerId: params.customerId },
  });
}

export async function syncPractitionerRevenue(params: {
  practitionerId: string;
  amount: number;
  description: string;
  paymentType: string;
}): Promise<any> {
  return orbitRequest('/api/financial-hub/ingest', {
    sourceSystem: 'VedaSolus',
    sourceAppId: 'dw_app_darkwavehealth',
    eventType: 'revenue',
    grossAmount: params.amount,
    netAmount: params.amount,
    description: params.description,
    productCode: `vedasolus_${params.paymentType}`,
    externalRef: params.practitionerId,
    idempotencyKey: `vedasolus_practitioner_${params.practitionerId}_${Date.now()}`,
    metadata: {
      owner: 'Jason Andrews',
      revenueShare: '100%',
    },
  });
}

export async function syncDoctors(doctors: Array<{
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialty?: string;
  department?: string;
  hireDate?: string;
  payRate?: number;
}>): Promise<any> {
  return orbitRequest('/api/ecosystem/sync/workers', {
    workers: doctors.map(doc => ({
      externalId: doc.externalId,
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      phone: doc.phone,
      role: doc.specialty || 'Physician',
      department: doc.department,
      hireDate: doc.hireDate,
      payRate: doc.payRate,
      payType: 'hourly',
      status: 'active',
    })),
  });
}

export async function syncTimesheets(entries: Array<{
  doctorId: string;
  date: string;
  hours: number;
  payRate: number;
  procedureCode?: string;
  notes?: string;
}>): Promise<any> {
  return orbitRequest('/api/ecosystem/sync/timesheets', {
    timesheets: entries.map(entry => ({
      workerId: entry.doctorId,
      date: entry.date,
      hoursWorked: entry.hours,
      payRate: entry.payRate,
      jobCode: entry.procedureCode,
      notes: entry.notes,
    })),
  });
}

export async function sync1099Contractors(contractors: Array<{
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  taxId?: string;
  paymentMethod?: string;
}>): Promise<any> {
  return orbitRequest('/api/ecosystem/sync/1099', {
    contractors: contractors.map(c => ({
      ...c,
      paymentMethod: c.paymentMethod || 'direct_deposit',
      status: 'active',
    })),
  });
}

export async function syncW2Employees(employees: Array<{
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  ssn?: string;
  federalWithholding?: string;
  stateWithholding?: string;
}>): Promise<any> {
  return orbitRequest('/api/ecosystem/sync/w2', {
    employees: employees.map(e => ({
      ...e,
      federalWithholding: e.federalWithholding || 'single',
      stateWithholding: e.stateWithholding || 'TN',
      status: 'active',
    })),
  });
}

export async function syncCertifications(certifications: Array<{
  workerId: string;
  certType: string;
  certNumber: string;
  issueDate: string;
  expiryDate: string;
}>): Promise<any> {
  return orbitRequest('/api/ecosystem/sync/certifications', {
    certifications: certifications.map(c => ({
      ...c,
      status: 'active',
    })),
  });
}

export async function getEcosystemStatus(): Promise<any> {
  const signature = generateSignature('');
  const response = await fetch(`${ORBIT_BASE_URL}/api/ecosystem/status`, {
    headers: {
      'X-Orbit-Api-Key': ORBIT_API_KEY,
      'X-Orbit-Signature': signature,
    },
  });
  return response.json();
}

export async function getFinancialHubStatus(): Promise<any> {
  const signature = generateSignature('');
  const response = await fetch(`${ORBIT_BASE_URL}/api/financial-hub/status`, {
    headers: {
      'X-Orbit-Api-Key': ORBIT_API_KEY,
      'X-Orbit-Signature': signature,
    },
  });
  return response.json();
}

export async function registerEcosystemApp(params?: {
  appName?: string;
  appDescription?: string;
  callbackUrl?: string;
  capabilities?: string[];
}): Promise<any> {
  return orbitRequest('/api/admin/ecosystem/register-app', {
    appId: ORBIT_API_KEY,
    appName: params?.appName || APP_NAME,
    appDescription: params?.appDescription || 'Holistic health platform bridging Ayurveda, TCM, and Western science',
    callbackUrl: params?.callbackUrl || APP_CALLBACK_URL,
    capabilities: params?.capabilities || [
      'health_tracking',
      'practitioner_marketplace',
      'ai_wellness_coach',
      'subscription_billing',
      'dosha_analysis',
    ],
    sourceSystem: 'VedaSolus',
    version: '2.1',
  });
}

export async function ecosystemSSOLogin(params: {
  email: string;
  token?: string;
  returnUrl?: string;
}): Promise<any> {
  return orbitRequest('/api/auth/ecosystem-login', {
    appId: ORBIT_API_KEY,
    email: params.email,
    token: params.token,
    returnUrl: params.returnUrl || APP_CALLBACK_URL,
    sourceSystem: 'VedaSolus',
  });
}

export async function registerTrustLayer(params: {
  userId: string;
  email: string;
  displayName: string;
  role?: string;
}): Promise<any> {
  return orbitRequest('/api/chat/auth/register', {
    appId: ORBIT_API_KEY,
    userId: params.userId,
    email: params.email,
    displayName: params.displayName,
    role: params.role || 'user',
    sourceSystem: 'VedaSolus',
    permissions: ['chat', 'read'],
  });
}

export async function handleStripeSubscriptionWebhook(event: any): Promise<void> {
  if (event.type === 'invoice.paid') {
    const invoice = event.data.object;
    const productCode = getProductCodeFromPlan(invoice);
    await syncSubscriptionRevenue({
      amount: invoice.amount_paid / 100,
      description: `VedaSolus Subscription - ${invoice.customer_email}`,
      productCode,
      stripeSubscriptionId: invoice.subscription,
      customerId: invoice.customer,
    });
  }
}

function getProductCodeFromPlan(invoice: any): string {
  const amount = invoice.amount_paid / 100;
  if (amount >= 39.99) return 'vedasolus_masters_journey_monthly';
  if (amount >= 19.99) return 'vedasolus_healers_circle_monthly';
  if (amount >= 9.99) return 'vedasolus_practitioner_path_monthly';
  return 'vedasolus_seeker_free';
}
