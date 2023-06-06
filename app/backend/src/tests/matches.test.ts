import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import {
  mockMatches,
  mockLogin,
  mockToken,
  newMockTeam,
  getByIdStub,
  mockedPayload,
  createStub
} from './mocks/matchesMock';

import * as jsonwebtoken from 'jsonwebtoken';

// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe('Verifica se retorna a rota de matches', async () => {
  afterEach(() => { sinon.restore(); });

  it('Verifica se retorna todas as partidas', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(mockMatches as Array<any>);
    const res = await chai.request(app).get('/matches');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.deep.eq(mockMatches);
  });

  it('Verifica se retonar erro para token invalido', async () => {
    sinon.stub(MatchesModel, 'update').resolves(undefined);
    const res = await chai.request(app).patch('/matches/1/finish');
    expect(res.status).to.be.eq(401);
    expect(res.body).to.be.deep.eq({ message: 'Token not found' });
  });

  it('Verifica se retorna umaa partida', async () => {
    sinon.stub(MatchesModel, 'update').resolves([1]);
    sinon.stub(jsonwebtoken, 'verify').resolves(mockLogin);
    const res = await chai.request(app).patch('/matches/1').set({ "Authorization": mockToken }).send(newMockTeam);
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.deep.eq({ message: 'Updated' });
  });

  it('Verifica se retorna a partida finalizada', async () => {
    sinon.stub(MatchesModel, 'update').resolves([1]);
    sinon.stub(jsonwebtoken, 'verify').resolves(mockLogin);
    const res = await chai.request(app).patch('/matches/1/finish').set({ "Authorization": mockToken });
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.deep.eq({ message: 'Finished' });
  });

  it('Verifica se cria a partida', async () => {
    sinon.stub(MatchesModel, 'create').resolves(getByIdStub as unknown as MatchesModel);
    sinon.stub(jsonwebtoken, 'verify').resolves(mockedPayload);
    const response = await chai.request(app).post('/matches').set({ "Authorization": mockToken }).send(createStub);
    expect(response.status).to.be.eq(201);
  });
});