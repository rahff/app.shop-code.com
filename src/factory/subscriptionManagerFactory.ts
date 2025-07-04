import { SubscriptionManager } from '../core/Subscription/api/SubscriptionManager';
import { fakePaymentGateway } from '../services/inMemory/FakePaymentGateway.ts';

export const subscriptionManager = () => new SubscriptionManager(fakePaymentGateway);