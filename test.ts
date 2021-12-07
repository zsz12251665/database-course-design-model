import './src/query/verbose';
import User from './src/DAO/User';

async function main() {
	const users = await User.select();
	console.log(users);
	await User.delete('root');
	const newUser = new User('root', 'super user', '123456');
	newUser.isAdministrator = true;
	await newUser.insert();
	console.log(newUser);
	console.log(newUser.authenticate('123456'));
	newUser.password = 'root';
	await newUser.update();
	console.log(newUser.authenticate('123456'));
}

/*
import './src/query/verbose';
import query from './src/query';

interface ITest {
	id: string;
	value: string;
}

async function main() {
	console.log(await new SelectQuery<ITest>('test').commit());
	console.log(await new InsertQuery('test', { id: '11', value: '132' }).commit());
	console.log(await new UpdateQuery('test', '11', { id: '5' }).commit());
	console.log(await new InsertQuery('test', { id: '11', value: '123' }).commit());
	console.log(await new SelectQuery<ITest>('test').commit());
	console.log(await new DeleteQuery('test', '5').commit());
	console.log(await new DeleteQuery('test', '11').commit());
	console.log(await new SelectQuery<ITest>('test').commit());
}
*/

main().catch(console.error).then(() => process.exit(0));
