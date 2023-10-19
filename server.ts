// @ts-ignore
// noinspection JSConstantReassignment
global.self = this;

import express from 'express';
import {createServer as createViteServer} from 'vite';
import fs from 'fs'
import path from 'path'
import {RenderFunction} from './src/entry-server';

const createServer = async () => {
	// окружение
	const isDev = 'development' === process.env.NODE_ENV;
	// @ts-ignore
	process.env.SSR = true;

	// сервер
	const server     = express();
	const viteServer = await createViteServer({
		appType: 'custom',
		server:  {
			middlewareMode: true,
		},
		mode:    process.env.NODE_ENV,
	});

	server.use(viteServer.middlewares);
	server.use('/assets', express.static(path.resolve(__dirname, 'dist', 'client', 'assets')));


	// рендер
	const templatePath = isDev ? path.resolve(__dirname, 'index.html') : path.resolve(__dirname, 'dist', 'client', 'index.html');
	let template       = fs.readFileSync(templatePath, 'utf-8');

	let render: RenderFunction;

	if (isDev) {
		render = (await viteServer.ssrLoadModule('./src/entry-server.ts')).render;
	}
	else {
		render = (await import('./dist/server/entry-server.js')).render;
	}

	// роутинг
	server.get('/', async (req, res) => {
		try {
			const {html} = await render(req.url, {});

			if (isDev) {
				template = await viteServer.transformIndexHtml(req.originalUrl, template);
			}

			template = template
				.replace('<!--app-content-->', html)

			res.send(template);
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}
	})

	return server;
}


createServer().then((server) => {
	server.listen(8080, () => {
		console.log(`Listen on http://localhost:8080/ (${process.env.NODE_ENV} mode)`)
	});
})
