const root = (req, res) => {
	const nombre = req.query.nombre || '';
	if (req.session.contador) {
		req.session.contador++;
		res.status(200).send(`${nombre} visitaste la página ${req.session.contador} veces`);
	} else {
		req.session.contador = 1;
		res.status(200).send(`${nombre} te damos la bienvenida`);
	};
}

const olvidar = (req, res) => {
	try {
		req.session.destroy();
		res.status(200).send('Hasta luego');
	} catch (error) {
		res.status(500).send('Error: ', error);
	}
}

module.exports = { root, olvidar };