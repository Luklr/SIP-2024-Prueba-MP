
import MercadoPago, {MercadoPagoConfig, Payment, Customer, CustomerCard} from 'mercadopago';


import http from "http";

const requestHandler = async (request, response) => {
  try {
    console.log(`Solicitud recibida: ${request.method} ${request.url}`);
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');


    const client = new MercadoPagoConfig({ accessToken: 'TEST-5756632963566168-041901-0bbb11da82a7aa7a8bafcbaba8983c5e-1778064506' });
    const customer = new Customer(client);
    await customer.create({ body: {
        email: "test_user_1909107003@testuser.com"
      }
    }).then(async (result) => {
      const customerCard = new CustomerCard(client);
      const body1 = {
        token : result.token,
      };

      await customerCard.create({ customerId: 'customer_id', body1 })
        .then(async (result) => console.log(result));
    })

    response.end('Hola Mundo!');
  } catch (error){
    console.error('Error:', error);
    response.statusCode = 500;
    response.end('Internal Server Error');
  }
};

  // Crea un servidor HTTP y pasa la función requestHandler como argumento
const server = http.createServer(requestHandler);

  // Escucha en el puerto 3000 y muestra un mensaje en la consola cuando el servidor está listo
server.listen(3000, (err) => {
    if (err) {
        return console.error('Error al iniciar el servidor:', err);
    }
    console.log('Servidor escuchando en el puerto 3000');
});