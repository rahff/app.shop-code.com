export interface Exception {
  message: string;
}
export class Null implements Exception {
  private constructor(public message: string = "null value") {}
  public static NULL(): Exception{
    return new Null();
  }
}

export class WrongShop implements Exception {
  public message: string = "The qrcode is not affiliated to the shop"
}

export class PromoExpired implements Exception {
  public message: string = "Promo expired"
}

export class PromoNotYetStarted implements Exception {
  public message: string = "Promo not started yet"
}

export class NotRecognized implements Exception {
  public message: string = "Not recognized"
}

export class InvalidDateRange implements Exception {
  public message: string = "Invalid date range"
}

export class FileUploadFailed implements Exception {
  public message: string = "File upload failed"
}

export class SaveResourceFailed implements Exception {
  public message: string = "Save resource failed"
}

export class UpgradedPlanRequired implements Exception {
  public constructor(public message: string = "Upgraded plan required") {}
}

export class InternalServerError implements Exception {
  public constructor(public message: string = "Internal server error") {}
}

export class UnauthenticatedUser implements Exception {
  public constructor(public message: string = "Unauthenticated user") {}
}


export const isException =  <T extends Object> (response: T | Exception): response is Exception => {
  return 'message' in response && true;
}