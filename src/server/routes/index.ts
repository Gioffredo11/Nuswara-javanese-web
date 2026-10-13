import { Router } from 'express';
import { charactersRouter } from './characters.routes';
import { storiesRouter } from './stories.routes';
import { philosophiesRouter } from './philosophies.routes';
import { batikRouter } from './batik.routes';
import { visualElementsRouter } from './visual-elements.routes';
import { wetonRouter } from './weton.routes';
import { oracleRouter } from './oracle.routes';
import { manifestationRouter } from './manifestation.routes';
import { photoboothRouter } from './photobooth.routes';
import { shareRouter } from './share.routes';
import { adminRouter } from './admin.routes';

export const apiRouter = Router();

// Mount all modular routers
apiRouter.use(charactersRouter);
apiRouter.use(storiesRouter);
apiRouter.use(philosophiesRouter);
apiRouter.use(batikRouter);
apiRouter.use(visualElementsRouter);
apiRouter.use(wetonRouter);
apiRouter.use(oracleRouter);
apiRouter.use(manifestationRouter);
apiRouter.use(photoboothRouter);
apiRouter.use(shareRouter);
apiRouter.use(adminRouter);
