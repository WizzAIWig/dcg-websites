/**
 * BASZ API Client
 * 
 * Client for interacting with the BASZ Platform API for real-time data:
 * - Pricing & Availability
 * - Customer accounts & balance (Strippenkaart)
 * - Orders & Checkout
 * - Cart/Reservation management
 * 
 * @see pixel-perfect-replica/docs/WEBSITE_ARCHITECTURE.md for full API spec
 */

export interface BaszClientConfig {
  baseUrl: string;
  brandId: string;
  timeout?: number;
}

export interface BaszAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// ============================================================================
// Types: Pricing & Availability
// ============================================================================

export interface CoursePrice {
  basePrice: number;
  discount: number;
  finalPrice: number;
  vat: number;
  currency: string;
  discountReason?: string;
}

export interface ScheduleAvailability {
  id: string;
  date: string;
  seatsAvailable: number;
  totalSeats: number;
  location: string;
  status: 'available' | 'limited' | 'full' | 'cancelled';
}

export interface CourseAvailability {
  courseId: string;
  schedules: ScheduleAvailability[];
}

// ============================================================================
// Types: Customer & Balance
// ============================================================================

export interface CustomerBalance {
  strippenkaart: {
    balance: number;
    expiryDate: string;
    transactions: BalanceTransaction[];
  };
  subscriptions: Subscription[];
}

export interface BalanceTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
}

export interface Subscription {
  id: string;
  type: string;
  validUntil: string;
  coursesRemaining: number;
}

export interface EligibilityResult {
  canUseStrippenkaart: boolean;
  strippenkaartCost: number;
  canUseSubscription: boolean;
  regularPrice: number;
  paymentOptions: PaymentOption[];
}

export interface PaymentOption {
  type: 'regular' | 'strippenkaart' | 'subscription';
  price: number;
  available: boolean;
  reason?: string;
}

// ============================================================================
// Types: Orders & Cart
// ============================================================================

export interface OrderItem {
  scheduleId: string;
  quantity: number;
  participants: Participant[];
}

export interface Participant {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateOrderRequest {
  customerId: string;
  items: OrderItem[];
  paymentMethod: string;
  billingAddressId: string;
}

export interface Order {
  id: string;
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled';
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed';
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

export interface Reservation {
  id: string;
  scheduleId: string;
  quantity: number;
  expiresAt: string;
}

// ============================================================================
// Types: Customer Profile
// ============================================================================

export interface CustomerProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseName: string;
  scheduleId: string;
  startDate: string;
  status: 'registered' | 'attended' | 'completed' | 'cancelled';
}

// ============================================================================
// BASZ API Client Class
// ============================================================================

export class BaszClient {
  private baseUrl: string;
  private brandId: string;
  private timeout: number;
  private tokens: BaszAuthTokens | null = null;
  
  constructor(config: BaszClientConfig) {
    this.baseUrl = config.baseUrl;
    this.brandId = config.brandId;
    this.timeout = config.timeout ?? 10000;
  }
  
  // ==========================================================================
  // HTTP Methods
  // ==========================================================================
  
  private async request<T>(
    method: string,
    path: string,
    options?: {
      body?: unknown;
      auth?: boolean;
      params?: Record<string, string>;
    }
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Brand-Id': this.brandId,
    };
    
    if (options?.auth && this.tokens) {
      headers['Authorization'] = `Bearer ${this.tokens.accessToken}`;
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: options?.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });
      
      if (!response.ok) {
        throw new BaszApiError(response.status, await response.text());
      }
      
      return response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }
  
  private get<T>(path: string, params?: Record<string, string>): Promise<T> {
    return this.request('GET', path, { params });
  }
  
  private post<T>(path: string, body: unknown, auth = false): Promise<T> {
    return this.request('POST', path, { body, auth });
  }
  
  private authGet<T>(path: string, params?: Record<string, string>): Promise<T> {
    return this.request('GET', path, { params, auth: true });
  }
  
  private authPost<T>(path: string, body: unknown): Promise<T> {
    return this.request('POST', path, { body, auth: true });
  }
  
  // ==========================================================================
  // Authentication
  // ==========================================================================
  
  async login(email: string, password: string): Promise<BaszAuthTokens> {
    const tokens = await this.post<BaszAuthTokens>('/auth/login', { email, password });
    this.tokens = tokens;
    return tokens;
  }
  
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<BaszAuthTokens> {
    const tokens = await this.post<BaszAuthTokens>('/auth/register', data);
    this.tokens = tokens;
    return tokens;
  }
  
  async refreshToken(): Promise<BaszAuthTokens> {
    if (!this.tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const tokens = await this.post<BaszAuthTokens>('/auth/refresh', {
      refreshToken: this.tokens.refreshToken,
    });
    this.tokens = tokens;
    return tokens;
  }
  
  setTokens(tokens: BaszAuthTokens): void {
    this.tokens = tokens;
  }
  
  clearTokens(): void {
    this.tokens = null;
  }
  
  // ==========================================================================
  // Pricing & Availability
  // ==========================================================================
  
  async getCoursePrice(
    courseId: string,
    customerId?: string,
    quantity = 1
  ): Promise<CoursePrice> {
    const params: Record<string, string> = { quantity: String(quantity) };
    if (customerId) params.customer_id = customerId;
    
    return this.get(`/pricing/course/${courseId}`, params);
  }
  
  async getCourseAvailability(
    courseId: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<CourseAvailability> {
    const params: Record<string, string> = {};
    if (dateFrom) params.date_from = dateFrom;
    if (dateTo) params.date_to = dateTo;
    
    return this.get(`/availability/course/${courseId}`, params);
  }
  
  async getScheduleAvailability(scheduleId: string): Promise<ScheduleAvailability> {
    return this.get(`/availability/schedule/${scheduleId}`);
  }
  
  // ==========================================================================
  // Customer Balance (Strippenkaart)
  // ==========================================================================
  
  async getBalance(): Promise<CustomerBalance> {
    return this.authGet('/customer/balance');
  }
  
  async checkEligibility(scheduleId: string): Promise<EligibilityResult> {
    return this.authGet('/customer/balance/eligibility', { schedule_id: scheduleId });
  }
  
  async redeemStrippen(
    scheduleId: string,
    quantity: number,
    source: 'strippenkaart' | 'subscription' = 'strippenkaart'
  ): Promise<{ success: boolean; remainingBalance: number; enrollmentId: string }> {
    return this.authPost('/customer/balance/redeem', {
      schedule_id: scheduleId,
      quantity,
      source,
    });
  }
  
  // ==========================================================================
  // Orders & Checkout
  // ==========================================================================
  
  async createOrder(data: CreateOrderRequest): Promise<Order> {
    return this.authPost('/orders/create', data);
  }
  
  async getOrder(orderId: string): Promise<Order> {
    return this.authGet(`/orders/${orderId}`);
  }
  
  async payOrder(
    orderId: string,
    paymentMethodNonce: string,
    returnUrl: string
  ): Promise<{ paymentUrl: string }> {
    return this.authPost(`/orders/${orderId}/pay`, {
      payment_method_nonce: paymentMethodNonce,
      return_url: returnUrl,
    });
  }
  
  // ==========================================================================
  // Cart / Reservation
  // ==========================================================================
  
  async createReservation(scheduleId: string, quantity: number): Promise<Reservation> {
    return this.authPost('/cart/reserve', { schedule_id: scheduleId, quantity });
  }
  
  async cancelReservation(reservationId: string): Promise<void> {
    await this.request('DELETE', `/cart/reserve/${reservationId}`, { auth: true });
  }
  
  // ==========================================================================
  // Customer Profile
  // ==========================================================================
  
  async getProfile(): Promise<CustomerProfile> {
    return this.authGet('/customer/profile');
  }
  
  async updateProfile(data: Partial<CustomerProfile>): Promise<CustomerProfile> {
    return this.request('PUT', '/customer/profile', { body: data, auth: true });
  }
  
  async getEnrollments(): Promise<Enrollment[]> {
    return this.authGet('/customer/enrollments');
  }
  
  async getInvoices(): Promise<unknown[]> {
    return this.authGet('/customer/invoices');
  }
  
  async getCertificates(): Promise<unknown[]> {
    return this.authGet('/customer/certificates');
  }
}

// ============================================================================
// Error Class
// ============================================================================

export class BaszApiError extends Error {
  constructor(
    public status: number,
    public body: string
  ) {
    super(`BASZ API Error (${status}): ${body}`);
    this.name = 'BaszApiError';
  }
}

// ============================================================================
// Factory Function
// ============================================================================

let clientInstance: BaszClient | null = null;

export function createBaszClient(config: BaszClientConfig): BaszClient {
  clientInstance = new BaszClient(config);
  return clientInstance;
}

export function getBaszClient(): BaszClient {
  if (!clientInstance) {
    throw new Error('BASZ client not initialized. Call createBaszClient first.');
  }
  return clientInstance;
}
