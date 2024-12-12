import { Request, Response } from 'express';
import { stripeService } from '../services/stripe.service';
import { db } from '../config/firebase';

export const subscriptionController = {
  async create(req: Request, res: Response) {
    try {
      const { planId, paymentMethodId } = req.body;
      const userId = req.user?.uid;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Get user data from Firestore
      const userDoc = await db.collection('company_profiles').doc(userId).get();
      const userData = userDoc.data();

      if (!userData?.email) {
        return res.status(400).json({ error: 'User email not found' });
      }

      // Create or get Stripe customer
      let customerId = userData.stripe_customer_id;
      if (!customerId) {
        const customer = await stripeService.createCustomer(
          userData.email,
          paymentMethodId
        );
        customerId = customer.id;

        // Save Stripe customer ID to Firestore
        await userDoc.ref.update({ stripe_customer_id: customerId });
      }

      // Create subscription
      const subscription = await stripeService.createSubscription(
        customerId,
        planId
      );

      // Save subscription details to Firestore
      await db.collection('subscriptions').doc(userId).set({
        subscription_id: subscription.id,
        plan_id: planId,
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        created_at: new Date(),
        updated_at: new Date()
      });

      res.json({ subscription });
    } catch (error: any) {
      console.error('Subscription creation failed:', error);
      res.status(400).json({ error: error.message });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Get subscription from Firestore
      const subscriptionDoc = await db.collection('subscriptions')
        .doc(userId)
        .get();

      if (!subscriptionDoc.exists) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      const subscriptionData = subscriptionDoc.data();

      // Get detailed subscription data from Stripe
      const subscription = await stripeService.getSubscription(
        subscriptionData!.subscription_id
      );

      res.json(subscription);
    } catch (error: any) {
      console.error('Failed to get subscription:', error);
      res.status(400).json({ error: error.message });
    }
  }
};