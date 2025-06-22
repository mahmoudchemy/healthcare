'use server';

import { ID, Query } from "node-appwrite"
import { databases, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";
import {InputFile} from 'node-appwrite/file'

export const createUser = async (user:CreateUserParams) =>{
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        )

        console.log({newUser});

        return parseStringify(newUser);
        
    } catch (error:any) {
        if(error && error?.code === 409){
            const existingUser = await users.list([
                Query.equal('email',[user.email])
            ])

            return existingUser?.users[0]
        }
    }
}

export const getUser = async (userId:string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user);


    } catch (error) {
        console.log(error)
        
    }
}

export const registerPatient = async ({identificationDocument, ...patient}:RegisterUserParams) => {
    try {
        let file;

        if(identificationDocument){
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string,
            )

            file = await storage.createFile('6853a81f00012a7c9e8b',ID.unique(), inputFile)
        }

        const newPatient = await databases.createDocument(
           '6853a7bf00043e42df21',
           '6853a7c9001e32eb3820',
           ID.unique(),
           {
            identificationDocumentId: file?.$id || null,
            identificationDocumentUrl: `${'https://cloud.appwrite.io/v1'}/storage/buckets/'6853a81f00012a7c9e8b'/files/${file?.$id}/view?project=${'6853a71900289df0064a'}`,
            ...patient
           }
        )

        return parseStringify(newPatient);

    } catch (error) {
        console.log(error)
    }
}

export const getPatient = async (userId:string) => {
    try {
        const patients = await databases.listDocuments(
            '6853a7bf00043e42df21',
            '6853a7c9001e32eb3820',
            [
                Query.equal('userId', userId)
            ]
        );

        return parseStringify(patients.documents[0]);


    } catch (error) {
        console.log(error)
        
    }
}

