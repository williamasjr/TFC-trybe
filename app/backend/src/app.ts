import * as express from 'express';
import { Request, Response } from 'express';
import LeaderboardRouter from './routes/LeaderboardRouter';
import matchesRouter from './routes/matchesRouter';
import userRouter from './routes/UserRouter';
import TeamsService from './services/TeamsService';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req: Request, res: Response) => res.json({ ok: true }));

    this.app.get('/teams', async (req: Request, res: Response) => {
      const teams = await TeamsService.findAll();
      return res.status(200).json(teams);
    });

    this.app.get('/teams/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const teams = await TeamsService.findById(Number(id));
      return res.status(200).json(teams);
    });

    this.app.use('/login', userRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/', LeaderboardRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
