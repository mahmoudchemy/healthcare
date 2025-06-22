'use server';

import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
           '6853a7bf00043e42df21',
           '6853a7e7000b56a87aaa',
           ID.unique(),
           appointment
        )

        return parseStringify(newAppointment);

    } catch (error) {
        console.log(error)
    }
}