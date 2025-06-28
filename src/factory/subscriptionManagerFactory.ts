import { SubscriptionManager } from '../core/Subscription/api/SubscriptionManager';
import { stripePaymentGateway } from '../services/external/StripePaymentGateway';

export const subscriptionManager = new SubscriptionManager(stripePaymentGateway);