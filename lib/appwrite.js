import { Client, Databases, Account, ID, Avatars, Query } from 'react-native-appwrite'

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '6727048e002c193fc027',
  platfrom: 'com.yinlynnhtun.aora',
  databaseId: '672707b1000971486f9c',
  userCollectionId: '672707c100168dcc8bae',
  videoCollectionId: '672707d90007dbef598c',
  storageId: '672709800036fb5a5b02',
}

const client = new Client()
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId) // Replace with your project ID
  .setPlatform(appwriteConfig.platfrom)

export const account = new Account(client)
export const databases = new Databases(client)
const avator = new Avatars(client)

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) throw Error

    const avatarUrl = avator.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    )

    return newUser
  } catch (error) {
    throw new Error(error)
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    throw new Error(error)
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get()

    return currentAccount
  } catch (error) {
    throw new Error(error)
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount()
    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ])

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    return null
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId)

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}
