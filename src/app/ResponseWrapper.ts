import { Headers } from '@angular/http';
//import {HttpHeaderResponse} from "@angular/common/http";

export class ResponseWrapper {
  constructor(
    public headers: Headers,
    public json: any,
    public status: number
  ) { }
}
