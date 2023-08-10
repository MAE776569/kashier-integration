import OrderCheckout from './OrderCheckout';
import * as _ from 'lodash';
import MainLayout from './components/MainLayout';

const CheckoutPage = async () => {
  return (
    <MainLayout>
      <OrderCheckout
        kashierMid={process.env.KASHIER_MID!}
        kashierApiKey={process.env.KASHIER_API_KEY!}
        kashierApiUrl={process.env.kASHIER_API_URL!}
        kashierRedirectUrl={process.env.KASHIER_REDIRECT_URL!}
        kashierWebhookUrl={process.env.KASHIER_WEBHOOK_URL!}
      />
    </MainLayout>
  );
};

export default CheckoutPage;
