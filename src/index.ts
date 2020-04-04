import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser"; //Chuyển đổi request của client từ json thành javascript object
import * as helmet from "helmet";
import * as cors from "cors";
import Route from "./routes/index";
const port = 3000;

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {

    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());// cho pheps reqest tu nhưng origin khác
    app.use(helmet());//Giúp bảo mật giá trị trong header cors
    app.use(bodyParser.json());

    //Set all routes from routes folder
    // app.use("/", routes);
    // app.get('/', (req, res) => res.send('Hello World!'))
    // console.log(routes);
    //routes
    Route.forEach(route => {
      app[route.method](
        route.route,
        route.middleware ? route.middleware : [],
        (req: express.Request, res: express.Response) => {
          route.action(req, res);
        }
      );
    });



    app.listen(port, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));