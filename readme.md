Database Access API library for database course design. Check frontend at [database-course-design-web](https://github.com/yioneko/database-course-design-web).

## MySQL tables

- [table.sql](docs/table.sql)
- [view.sql](docs/view.sql)

## Installation

```bash
npm install https://github.com/zsz12251665/database-course-design-model.git
```

## Usage

### DAO classes

```ts
import {
	Book,
	Comment,
	Copy,
	Notification,
	Transaction,
	User
} from 'database-course-design-model';
```

### Query classes

```ts
import {
	BaseQuery,
	CountQuery,
	DeleteQuery,
	InsertQuery,
	SelectQuery,
	UpdateQuery
} from 'database-course-design-model/query';
```

### Verbose query mode

Print the query to the console before commitment

```ts
import 'database-course-design-model/verbose';
```
