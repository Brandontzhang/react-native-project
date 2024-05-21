import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.aora',
  projectId: '664cf5730003ec6dae19',
  databaseId: '664cf6ac003034b4c950',
  userCollectionId: '664cf6e3002c0f077b5f',
  videoCollectionId: '664cf700002c3694891b',
  storageId: "664cf801002aa8a0bb6b",
}

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);


const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    let newAccount = await account.create(ID.unique(), email, password, username);
    let avatarUrl = avatar.getInitials(username);

    // WARNING:He adds a catch here for if there is no new account and throws an error, but I think that should be caught in the catch block anyways

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );

    await signIn(email, password);
    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    // TODO: check if error gets thrown if there is no account logged in

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    // TODO: also if no user

    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error);
  }
}