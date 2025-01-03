import { Helper } from './helpers/helpers';

const helper = new Helper();

describe('Test OK /api/v1/ciudades/Aregua', () => {
  test('It should response the GET method /api/v1/ciudades/Aregua', async () => {
    const response = await helper.apiServer.get('/api/v1/ciudades/Aregua');

    expect(response.statusCode).toBe(200);
    expect.assertions(1);
  });

  test('It should response the GET method /api/v1/ciudades/', async () => {
    const response = await helper.apiServer.get('/api/v1/ciudades/');

    const statusCode = response.statusCode;
    const type = response.type;
    const header = response.header;
    const contentType = header['content-type'];
    const body = response.body;
    const dataSuccess = body.success;

    const parseJson = () => {
      const json = JSON.stringify(body);

      JSON.parse(json);
    };

    expect(statusCode).toBe(200);
    expect(type).toEqual('application/json');
    expect(contentType).toEqual('application/json; charset=utf-8');
    expect(parseJson).not.toThrow();
    expect(dataSuccess).toBe(true);

    expect.assertions(5);
  });
});
