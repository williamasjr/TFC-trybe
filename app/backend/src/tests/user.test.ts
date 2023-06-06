import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import UsersModel from '../database/models/UsersModel';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const mockToken = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0NjE5NDQ5LCJleHAiOjE2OTMyNTk0NDl9.XFFBO5dUf70zHuaJK1jh12fMCGThPrzDyhyIeFOXoAs"
};
const mockCorrectLogin = { "email": "admin@admin.com", "password": "secret_admin" };
const mockWrongLogin = { "email": "admin@admin.com", "password": "ssss" };

describe('Verifica a rota get login', async () => {
  afterEach(() => { sinon.restore(); });

  it('Verifica se retorna o login certo', async () => {
    sinon.stub(UsersModel, 'findOne').resolves();
    const { body, status } = await chai.request(app).post('/login').send(mockCorrectLogin);
    expect(status).to.be.deep.eq(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  });

  it('Verifica se nao retorna o login errado', async () => {
    sinon.stub(UsersModel, 'findOne').resolves();
    const { body, status } = await chai.request(app).post('/login').send(mockWrongLogin);
    expect(status).to.be.deep.eq(401);
    expect(body).to.be.deep.eq({ message: 'Invalid email or password' });
  });

  it('Verifica a rota do token', async () => {
    sinon.stub(UsersModel, 'findByPk').resolves();
    const { body, status } = await chai.request(app).get('/login/role').set({ "Authorization": mockToken });
    expect(status).to.be.deep.eq(401);
    expect(body).to.be.deep.eq({ message: 'Token must be a valid token' });
  });

  it('Verifica se nao retorna com o token errado', async () => {
    sinon.stub(UsersModel, 'findByPk').resolves();
    const { body, status } = await chai.request(app).get('/login/role');
    expect(status).to.be.deep.eq(401);
    expect(body).to.be.deep.eq({ message: 'Token not found' });
  });

});