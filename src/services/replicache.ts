import { Replicache, TEST_LICENSE_KEY } from 'replicache';

type Mutators = {
    createUser: (tx: any, {id, username}: {id: string, username: string}) => void;
}

export const createUser = async (id: string, name: string, clientID: string, mutationID: string) => {
  try {
    const res = await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, username: name, clientID, mutationID }),
    });

    if (!res.ok) {
      throw new Error('Failed to create user');
    }

    const user = await res.json();

    const replicache = new Replicache<Mutators>({
      name: user.id,
      pushURL: 'http://localhost:8000/api/replicache/push',
      pullURL: 'http://localhost:8000/api/replicache/pull',
      licenseKey: TEST_LICENSE_KEY,
      mutators: {
        createUser: async (tx, {id, username}) => {
            await tx.put(`user/${id}`, {id, username});
        },
      }
    });

    await replicache.mutate.createUser({ id: user.id, username: user.username });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};