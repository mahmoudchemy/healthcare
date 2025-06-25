'use server';

import { ID, Query } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

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

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            '6853a7bf00043e42df21',
            '6853a7e7000b56a87aaa',
            appointmentId,
        )

        return parseStringify(appointment);
    } catch (error) {
        console.log(error);
    }
}

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            '6853a7bf00043e42df21',
            '6853a7e7000b56a87aaa',
            [Query.orderDesc('$createdAt')]
        );

        const initialCounts = {
            scheduledCount:0,
            pendingCount:0,
            cancelledCount:0,
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc,appointment) =>{
            if (appointment.status ==='scheduled'){
                acc.scheduledCount +=1;
            }else if (appointment.status === 'pending'){
                acc.pendingCount += 1;
            } else if(appointment.status === 'cancelled'){
                acc.cancelledCount +=1;
            }

            return acc;

        }, initialCounts);

        const data ={
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }

        return parseStringify(data);
    
    } catch (error) {
        console.log(error);
    }
}

export const updateAppointment = async ({appointmentId, userId, appointment,type}:UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            '6853a7bf00043e42df21',
            '6853a7e7000b56a87aaa',
            appointmentId,
            appointment
        )

        if(!updatedAppointment){
            throw new Error('Appointment not found')
        }

        //SMS Confirmation
        revalidatePath('/admin');
        return parseStringify(updatedAppointment);
    } catch (error) {
        console.log(error);
    }
}


