import { v4 as uuid } from 'uuid';
import BaseEntity from './base';
import User from './User';

interface INotification {
	id: string;
	user_id: string;
	message: string;
	sentTime: Date;
	isRead: boolean;
}

interface UserReference {
	user_id: string;
	user_name: string;
	user_isAdministrator: boolean;
	user_authentication: string;
	user_salt: string;
}

export default class Notification extends BaseEntity<typeof Notification> {
	static readonly entityName = 'notification';

	id!: string;
	user!: User;
	message!: string;
	sentTime!: Date;
	isRead!: boolean;

	constructor(user: User, message: string, sentTime: Date = new Date()) {
		super();
		this.id = uuid();
		this.user = user;
		this.message = message;
		this.sentTime = sentTime;
		this.isRead = false;
	}

	static unwrap(wrapped: INotification & UserReference): Notification {
		const user = User.unwrap({
			id: wrapped.user_id,
			name: wrapped.user_name,
			isAdministrator: wrapped.user_isAdministrator,
			authentication: wrapped.user_authentication,
			salt: wrapped.user_salt
		});
		const notification = new Notification(user, wrapped.message, wrapped.sentTime);
		notification.isRead = wrapped.isRead;
		return notification;
	}

	wrap(): INotification {
		return {
			id: this.id,
			user_id: this.user.id,
			message: this.message,
			sentTime: this.sentTime,
			isRead: this.isRead
		};
	}
}
