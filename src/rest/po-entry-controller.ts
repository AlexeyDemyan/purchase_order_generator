import { StatusCodes } from "http-status-codes";
import { Response, Router } from "express";
import { Route, Controller } from "../types_and_interfaces/index.js";

const DEFAULT_CONTENT_TYPE = "application/json";

export class POEntryController implements Controller {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    this._router[route.method](route.path, route.handler.bind(this));
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res.type(DEFAULT_CONTENT_TYPE).status(statusCode).json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
