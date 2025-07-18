import { SubscriptionManager } from '../core/Subscription/api/GetCheckoutUrl.ts';
import { fakePaymentGateway } from '../services/inMemory/FakePaymentGateway.ts';

export const subscriptionManager = () => new SubscriptionManager(fakePaymentGateway);