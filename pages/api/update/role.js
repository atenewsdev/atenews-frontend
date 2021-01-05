import admin from '@/utils/firebaseAdmin';

export default async (req, res) => {
  let { id, email, roles, api_key } = req.body;

  if (email && api_key === process.env.NEXT_PUBLIC_WP_USER_KEY) {
    const querySnapshot = await admin.firestore().collection('users').where('email', '==', email).get();
    if (querySnapshot.docs.length > 0) {
      await admin.firestore().collection('users').doc(querySnapshot.docs[0].id).update({
        roles,
        staff: !roles.includes('inactive'),
      });

      await admin.firestore().collection('wordpress').doc(id.toString()).set({
        id: querySnapshot.docs[0].id,
      });
    }

    res.status(200).send({
      email,
      roles
    });
  } else {
    res.status(500).send('WP is required.')
  }
}