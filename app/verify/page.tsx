import * as crypto from 'crypto';
import VerificationModal from './VerificationModal';

function validateSignature(query: any, secret: string) {
  let queryString = '';
  for (let key in query) {
    if (key == 'signature' || key == 'mode') continue;
    queryString = queryString + '&' + key + '=' + query[key];
  }
  let finalUrl = queryString.substring(1);
  const signature = crypto
    .createHmac('sha256', secret)
    .update(finalUrl)
    .digest('hex');
  if (signature == query.signature) return true;
  else return false;
}

const Verify = ({ searchParams }: any) => {
  const isValidSignature = validateSignature(
    searchParams,
    process.env.KASHIER_API_KEY!
  );

  return <VerificationModal isValidSignature={isValidSignature} />;
};

export default Verify;
