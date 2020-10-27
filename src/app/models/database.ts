import * as mysql from "mysql";
import constants from "../../config/constants";

export class mysql_connector {
  private connector;

  constructor() {
    this.connector = mysql.createConnection({
      host: constants["db-url"],
      port: constants["db-port"],
      user: constants["db-user"],
      password: constants["db-password"],
      database: constants["db-schema"],
    });
  }

  public save_fisicalModel(model: object): void {
    //implementacion para guardar el modelo en la base de datos
  }
  public getfisicalModel(modelID: string): object {
    return {};
  }
  public validateUser(userName: string, passwoedUser: string): boolean {
    if (userName == "nicolas@ejemplo.com" && passwoedUser == "1234") return true;
    return false;
  }
}
