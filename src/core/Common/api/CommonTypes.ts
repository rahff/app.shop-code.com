import {Exception, Null} from './Exception';


export class Result<T=any, E=Exception> {
  public constructor(private value: T, private error: E) {}

  public isOk(): boolean {
    return (this.error instanceof Null);
  }

  public getValue(): T {
    return this.value;
  }

  public getError(): E {
    return this.error;
  }
}

export const ok = <T> (value: T): Result<T, Null>  => {
  return new Result(value, Null.NULL());
}

export const err = <E extends Exception> (error: E): Result<any, E>  => {
  return new Result(null, error);
}

type RedirectionParams = {
  error?: string;
  origin?: string;
}

export interface Redirection {
  path: string;
  params?: RedirectionParams;
}



