import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

const mockTeam = [
    { id: 1, teamName: 'Team 1' },
    { id: 2, teamName: 'Team 2' },
];

const mockTeamId = { id: 1, teamName: 'Team 1' };

describe('Verifica a rota get /teams', async () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Verifica se retorna todos os times', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(mockTeam as TeamsModel[]);
    const res = await chai.request(app).get('/teams');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.deep.eq(mockTeam);
  });

  it('Verifica se retorna o time pelo ID ', async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(mockTeamId as TeamsModel);
    const res = await chai.request(app).get('/teams/1');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.deep.eq(mockTeamId);
  });
  
  it('Verifica se retorna o time errado', async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(null);
    const res = await chai.request(app).get('/teams/1');
    expect(res.status).to.be.eq(404);
    expect(res.body).to.be.deep.eq({ message: 'Team not found' });
  });

});