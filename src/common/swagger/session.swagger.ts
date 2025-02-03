/**
 * @swagger
 * /session:
 *   post:
 *     summary: Autenticação de Cliente
 *     description: Realiza a autenticação de um cliente fornecendo email e senha e retorna um token JWT para acesso às rotas protegidas.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: minhaSenhaSecreta123
 *     responses:
 *       200:
 *         description: Retorna os detalhes do cliente autenticado e o token JWT gerado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customer:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Admin
 *                     email:
 *                       type: string
 *                       example: admin@example.com
 *                 token:
 *                   type: string
 *                   example: a5a5ffb42b144a1bb87796ae41654999.a5a5ffb42b144a1bb87796ae41654999.a5a5ffb42b144a1bb87796ae41654999.a5a5ffb42b144a1bb87796ae41654999.a5a5ffb42b144a1bb87796ae41654999
 *       404:
 *         description: Erro ao autenticar o cliente, como email ou senha inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Incorrect email or password
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno no servidor
 */
module.exports = {};
