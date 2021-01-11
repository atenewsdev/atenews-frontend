import { forgotPassword } from '@/utils/email';

export default async (req, res) => {
  let email = '';
  if (req.method === 'POST') {
    // Process a POST request
    email = req.body.email;
    try {
      await forgotPassword(email);
      res.status(200).json({ message: 'success' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(404).send({ message: 'not found' });
    // Handle any other HTTP method
  }
};
