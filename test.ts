import query from './src/query';

interface ITest {
	id: number;
	value: string;
}

async function main() {
	query.verbose();
	console.log(await query.select<ITest>('* FROM `test`'));
	console.log(await query.insert<ITest>('test', { id: 11, value: '132' }));
	console.log(await query.update<ITest>('test', 11, { id: 5 }));
	console.log(await query.insert<ITest>('test', { id: 11, value: '123' }));
	console.log(await query.select<ITest>('* FROM `test`'));
	console.log(await query.delete<ITest>('test', 5));
	console.log(await query.delete<ITest>('test', 11));
	console.log(await query.select<ITest>('* FROM `test`'));
}

main().catch(console.error).then(() => process.exit(0));
