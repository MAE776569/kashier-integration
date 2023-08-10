import * as crypto from 'crypto';
import * as _ from 'lodash';
import queryString from 'query-string';

const handler = (req: any, res: any) => {
  const { data, event } = req.body;
  data.signatureKeys.sort();
  const objectSignaturePayload = _.pick(data, data.signatureKeys);
  const signaturePayload = queryString.stringify(objectSignaturePayload);
  const signature = crypto
    .createHmac('sha256', process.env.KASHIER_API_KEY!)
    .update(signaturePayload)
    .digest('hex');
  const kashierSignature = req.headers.get('x-kashier-signature');
  if (kashierSignature === signature) {
    console.log('valid signature');
    return res.status(200).json({ message: 'valid signature' });
  } else {
    console.log('invalid signature');
    return res.status(200).json({ message: 'valid signature' });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
export { handler as POST };
