import { writeFile, rm } from 'fs/promises';
import { DEVELOPMENT_FILES, ERROR_SAVING_FILE } from './../../config/constants';
import { v4 as uuidv4 } from 'uuid';
import { resolve, join } from 'path';
import { UPLOADS_PATH } from '../../config/paths';
import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadsFolder } from '../../@types/folder';
@Injectable()
export class FileService {
  constructor() {}
  public async updateMulterFile(
    file: Express.Multer.File,
    folder: UploadsFolder,
    oldFilePathName: string | null = null,
    isSettingNull = false,
  ) {
    let resultPathName: string | null;
    if (file && process.env.NODE_ENV == 'development') {
      throw new ForbiddenException(DEVELOPMENT_FILES);
    }
    if (isSettingNull) {
      if (oldFilePathName) {
        const oldDest = resolve(UPLOADS_PATH, oldFilePathName);
        await this.delete(oldDest);
      }
      resultPathName = null;
    } else if (file) {
      if (oldFilePathName) {
        const oldImgDest = resolve(UPLOADS_PATH, oldFilePathName);
        await this.delete(oldImgDest);
      }
      resultPathName = join(folder, uuidv4() + '-' + file.originalname);
      const destName = resolve(UPLOADS_PATH, resultPathName);
      try {
        await this.save(destName, file.buffer);
      } catch (error) {
        throw new InternalServerErrorException(ERROR_SAVING_FILE);
      }
    }
    return resultPathName;
  }

  public async deleteFile(path: string) {
    const destName = resolve(UPLOADS_PATH, path);
    await this.delete(destName);
  }

  public async updateBufferFile(
    buffer: Buffer,
    name: string,
    folder: UploadsFolder,
    oldFilePathName: string | null = null,
    setFileToNull = false,
  ) {
    let resultPathName: string | null;
    if (buffer && process.env.NODE_ENV == 'development') {
      // throw new ForbiddenException(DEVELOPMENT_FILES);
    }
    if (setFileToNull) {
      if (oldFilePathName) {
        const oldDest = resolve(UPLOADS_PATH, oldFilePathName);
        await this.delete(oldDest);
      }
      resultPathName = null;
    } else if (buffer) {
      if (oldFilePathName) {
        const oldImgDest = resolve(UPLOADS_PATH, oldFilePathName);
        await this.delete(oldImgDest);
      }
      resultPathName = join(folder, uuidv4() + '-' + name);
      const destName = resolve(UPLOADS_PATH, resultPathName);
      try {
        await this.save(destName, buffer);
      } catch (error) {
        throw new InternalServerErrorException(ERROR_SAVING_FILE);
      }
    }
    return resultPathName;
  }

  async save(filePath: string, file: Buffer) {
    try {
      await writeFile(filePath, file);
    } catch (error) {
      throw error;
    }
  }
  async delete(pathToFile: string) {
    try {
      await rm(pathToFile);
    } catch (error) {
      throw error;
    }
  }
}
