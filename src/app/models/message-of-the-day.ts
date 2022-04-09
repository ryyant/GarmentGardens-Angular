export class MessageOfTheDay
{
    motdId: number | undefined;
	title: string | undefined;
	message: string | undefined;
	messageDate: Date | undefined;



    constructor(motdId?: number, title?: string, message?: string, messageDate?: Date)
	{
		this.motdId = motdId;
		this.title = title;
		this.message = message;
		this.messageDate = messageDate;
	}
}
