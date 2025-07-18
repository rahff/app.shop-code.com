import {IdGenerator} from "../../core/Common/spi/IdGenerator.ts";

export class CryptoIdGenerator implements IdGenerator {
  generate(): string {
    return crypto.randomUUID().toString();
  }
}


export const cryptoIdGenerator = new CryptoIdGenerator();