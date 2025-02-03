/**
 * @swagger
 * /order:
 *   get:
 *     summary: Obter Pedidos com Status 'Pending' ou 'Failed' dos Últimos 7 Dias
 *     description: Retorna todos os pedidos com status de pagamento 'Pending' ou 'Failed' realizados nos últimos 7 dias.
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           example: "Pending"
 *     responses:
 *       200:
 *         description: Lista de pedidos com status 'Pending' ou 'Failed' dos últimos 7 dias.
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
 *       400:
 *         description: Status inválido fornecido na query string.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: No valid status reported
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
 *       404:
 *         description: Nenhum pedido encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: No orders found
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

/**
 * @swagger
 * /order/city:
 *   get:
 *     summary: Obter Total de Vendas por Cidade de Entrega
 *     description: Retorna o total de vendas por cidade de entrega, agrupando os pedidos por cidade e somando o valor total das vendas.
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Total de vendas por cidade de entrega.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                     example: Manaus
 *                   totalSales:
 *                     type: string
 *                     example: "1999.98"
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
 *       404:
 *         description: Nenhum pedido encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: No orders found
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
