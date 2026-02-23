export default async function handler(req, res) {
	// Importamos el servidor generado por Angular
	// Nota: La ruta es relativa a la ejecución en Vercel
	const server = await import('../dist/portfolio/server/server.mjs')

	// Usamos el handler que Angular exporta por defecto
	return server.app()(req, res)
}
