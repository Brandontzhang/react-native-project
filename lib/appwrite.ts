import { Account, Client, ID } from 'react-native-appwrite';

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


export const createUser = async (email: string, password: string, username: string) => {
  const account = new Account(client);
  try {
    let response = await account.create(ID.unique(), email, password, username);
    return response;
  } catch (error) {
    throw error;
  }
}
