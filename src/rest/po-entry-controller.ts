import { StatusCodes } from "http-status-codes";
import { Response, Request, Router } from "express";
import {
  Route,
  Controller,
  HttpMethod,
} from "../types_and_interfaces/index.js";
import { PurchaseOrderEntryModel } from "../schemas/purchase-order-entry.model.js";

const DEFAULT_CONTENT_TYPE = "application/json";

export class POEntryController implements Controller {
  private readonly _router: Router;

  constructor() {
    this._router = Router();

    this.addRoute({ path: "/", method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: "/", method: HttpMethod.Post, handler: this.create });
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

  public async index(_req: Request, res: Response): Promise<void> {
    const po_entries = await PurchaseOrderEntryModel.find();
    this.ok(res, po_entries);
  }

  public create(req: Request, res: Response): void {
    console.log(req);
    console.log(res);
  }
}
