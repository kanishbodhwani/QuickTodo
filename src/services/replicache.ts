import { Replicache, TEST_LICENSE_KEY} from 'replicache';

export const createUser = async (id: string, name: string) => {
  try {
    const res = await fetch('http://your-api-endpoint/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, username: name }),
    });

    if (!res.ok) {
      throw new Error('Failed to create user');
    }

    const user = await res.json();

    const replicache = new Replicache({
      name: user.id,
      pushURL: 'http://your-replicache-push-url',
      pullURL: 'http://your-replicache-pull-url',
      licenseKey: TEST_LICENSE_KEY
    });

    await replicache.mutate.createUser({ id: user.id, username: user.username });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
