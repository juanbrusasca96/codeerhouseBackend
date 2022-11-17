const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const router = require('./routes/sessionRouter');
const app = express();
const PORT = 8080;

app.use(session({
	store: new FileStore({ path: './sessions', ttl: 60, retries: 0 }),
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60000
	}
}));

app.use('/session', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));