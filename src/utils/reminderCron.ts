import cron from "node-cron";
import { ReminderModel } from "../models/reminderModel";

async function processReminders() {
    console.log("Verificando lembretes pendentes...");
    const reminders = await ReminderModel.findPending();

    for (const r of reminders as any[]) {
        // Aqui você pode implementar o envio real (e-mail, WhatsApp, etc)
        console.log(`Enviando lembrete [${r.id}] para usuário ${r.user_id}: ${r.title}`);

        await ReminderModel.markAsSent(r.id);
    }
}

// Executa todos os dias às 07h50
cron.schedule("50 7 * * *", processReminders);

export { processReminders };
