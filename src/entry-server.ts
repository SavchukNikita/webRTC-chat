import {Router} from 'vue-router';
import {renderToString} from 'vue/server-renderer';
import {createApp} from './main';

type ManifestType = {
	[key: string]: string[],
};

interface RenderResult {
	html: string;
	preloadLinks: string;
	router: Router;
}

export type RenderFunction = (url: string, manifest?: ManifestType) => RenderResult;

function renderPreloadLinks(modules: Set<string>, manifest: ManifestType) {
	let links  = '';
	const seen = new Set();
	modules.forEach((id) => {
		const files = manifest[id];
		if (files) {
			files.forEach((file) => {
				if (!seen.has(file)) {
					seen.add(file);
					links += renderPreloadLink(file);
				}
			});
		}
	});

	return links;
}

function renderPreloadLink(file: string) {
	if (file.endsWith('.js')) {
		return `<link rel="modulepreload" crossorigin href="${file}">`;
	}
	else if (file.endsWith('.css')) {
		return `<link rel="stylesheet" href="${file}">`;
	}
	else {
		return '';
	}
}

export async function render(url: string, manifest: ManifestType = {}): Promise<RenderResult> {
	const {app, router} = createApp();

	await router.push(url);
	await router.isReady();

	const ctx = {modules: new Set<string>()};

	const html         = await renderToString(app, ctx);
	const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

	return {
		html,
		preloadLinks,
		router,
	};
}
