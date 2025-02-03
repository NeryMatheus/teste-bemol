/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Criação de Cliente
 *     description: Registra um novo cliente no sistema fornecendo nome, email, senha e CPF.
 *     tags:
 *       - Cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Teste
 *               email:
 *                 type: string
 *                 example: teste@example.com
 *               password:
 *                 type: string
 *                 example: minhaSenhaSecreta123
 *               cpf:
 *                 type: string
 *                 example: 111.111.111-11
 *               street:
 *                 type: string
 *                 example: ABC
 *               number:
 *                 type: string
 *                 example: ABC-123
 *               complement:
 *                 type: string
 *                 example: null
 *               city:
 *                 type: string
 *                 example: Belém
 *               state:
 *                 type: string
 *                 example: Pará
 *               zipcode:
 *                 type: string
 *                 example: 69000-123
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: a5a5ffb4-2b14-4a1b-b877-96ae41654999
 *                 name:
 *                   type: string
 *                   example: Teste
 *                 email:
 *                   type: string
 *                   example: teste@example.com
 *                 cpf:
 *                   type: string
 *                   example: 111.111.111-11
 *                 city:
 *                   type: string
 *                   example: Belém
 *                 state:
 *                   type: string
 *                   example: Pará
 *                 zipCode:
 *                   type: string
 *                   example: 69000-123
 *       401:
 *         description: Token JWT inválido ou ausente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Invalid JWT token
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /customer/orders:
 *   get:
 *     summary: Obter Pedidos do Cliente
 *     description: Retorna todos os pedidos realizados por um cliente específico, incluindo detalhes como total, status de pagamento, itens e endereço de entrega.
 *     tags:
 *       - Cliente
 *     responses:
 *       200:
 *         description: Lista de pedidos do cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     example: 20d99537-93e2-4adf-b1ab-a0f0a58b4ace
 *                   totalAmount:
 *                     type: number
 *                     example: 1.99
 *                   orderDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-01-31T15:18:48.731Z
 *                   paymentStatus:
 *                     type: string
 *                     example: FAILED
 *                   discountCode:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   totalAmountWithDiscount:
 *                     type: number
 *                     example: 1.99
 *                   notes:
 *                     type: string
 *                     example: Entregar no período da manhã
 *                   orderItems:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         itemId:
 *                            type: string
 *                            example: dc95e649-dda1-4e5c-a300-4eb0466fe5b5
 *                         itemName:
 *                            type: string
 *                            example: Camiseta
 *                         itemSpecification:
 *                            type: string
 *                            example: Camiseta branca tamanho M
 *                         unitPrice:
 *                            type: number
 *                            example: 1.99
 *                         quantity:
 *                            type: integer
 *                            example: 1
 *                   deliveryAddress:
 *                     type: object
 *                     properties:
 *                       customer:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: Matheus Nery
 *                           cpf:
 *                             type: string
 *                             example: 000.000.000-00
 *                       street:
 *                         type: string
 *                         example: Rua Unicórnio
 *                       number:
 *                         type: string
 *                         example: 95
 *                       city:
 *                         type: string
 *                         example: Barcelos
 *                       state:
 *                         type: string
 *                         example: Amazonas
 *                       zipCode:
 *                         type: string
 *                         example: 69040000
 *       401:
 *         description: JWT token ausente ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: JWT token is missing
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
module.exports = {};
