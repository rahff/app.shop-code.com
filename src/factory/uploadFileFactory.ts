import { UploadFile } from '../core/UploadImage/api/UploadFile';
import { inMemoryUploadFileApi } from '../services/inMemory/InMemoryUploadFileApi';
import { CryptoIdGenerator } from '../services/browser/CryptoIdGenerator';

export const uploadFileFactory = () => new UploadFile(inMemoryUploadFileApi, new CryptoIdGenerator());