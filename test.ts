import './src/query/verbose';
import { Book, Comment, Copy, Notification, Transaction, User } from './src/DAO';

async function main() {
	console.log(await Book.select());
	console.log(await Comment.select());
	console.log(await Copy.select());
	console.log(await Notification.select());
	console.log(await Transaction.select());
	console.log(await User.select());
	console.log(await User.count());
	await User.delete('root');
	const newUser = new User('root', 'super user', '123456');
	newUser.isAdministrator = true;
	await newUser.insert();
	console.log(newUser);
	console.log(newUser.authenticate('123456'));
	newUser.password = 'root';
	await newUser.update();
	console.log(newUser.authenticate('123456'));
	await newUser.delete();
}

main().catch(console.error).then(() => process.exit(0));
