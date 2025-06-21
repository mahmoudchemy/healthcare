import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6853a71900289df0064a').setKey('standard_2e36b0a919b1666e2e7d861260314a6586166dc6b305923e4391acf1ff2ea6c90ad6f597321622d59f5aeaf31943def9a9ea7ef45a3f4cf1dd8f819149b89435b6f16433c03141e8f8b9b6ec2fa9b9fe1ed84aaeccb7cdbcb144eb11ad1a1e485bc4f99f633d2bf67cebb9463f2706ec3b6acfa1268ee8ab8e2324594fc29afb');

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);