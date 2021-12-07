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

/* import query from './src/query';

interface ITest {
	id: string;
	value: string;
}

async function main() {
	query.verbose();
	console.log(await query.select<ITest>('* FROM `test`'));
	console.log(await query.insert<ITest>('test', { id: '11', value: '132' }));
	console.log(await query.update<ITest>('test', '11', { id: '5' }));
	console.log(await query.insert<ITest>('test', { id: '11', value: '123' }));
	console.log(await query.select<ITest>('* FROM `test`'));
	console.log(await query.delete('test', '5'));
	console.log(await query.delete('test', '11'));
	console.log(await query.select<ITest>('* FROM `test`'));
} */

main().catch(console.error).then(() => process.exit(0));
