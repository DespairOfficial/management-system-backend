import { writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { ERROR_SAVING_FILE } from './../../config/constants';
import { v4 as uuidv4 } from 'uuid';
import { resolve, join, normalize } from 'path';
import { UPLOADS_PATH } from '../../config/paths';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadsFolder } from '../../@types/folder';
@Injectable()
export class FileService {
  public async updateMulterFile(
    fileOrOldPath: Express.Multer.File | null | string | undefined,
    folder: UploadsFolder,
    oldFilePathName: string = undefined,
  ) {
    let resultPathName = oldFilePathName;

    if (fileOrOldPath && typeof fileOrOldPath !== 'string') {
      if (oldFilePathName) {
        const oldDest = resolve(UPLOADS_PATH, oldFilePathName);
        await this.delete(oldDest);
      }
      resultPathName = join(folder, uuidv4() + '-' + fileOrOldPath.originalname);
      const destName = resolve(UPLOADS_PATH, resultPathName);
      try {
        await this.save(destName, fileOrOldPath.buffer);
        return resultPathName;
      } catch (error) {
        throw new InternalServerErrorException(ERROR_SAVING_FILE);
      }
    }

    if (!(typeof fileOrOldPath === 'string' && normalize(fileOrOldPath) === oldFilePathName)) {
      if (oldFilePathName) {
        const oldDest = resolve(UPLOADS_PATH, oldFilePathName);
        await this.delete(oldDest);
      }
      resultPathName = null;
    }
    return resultPathName;
  }

  public async addMulterFile(file: Express.Multer.File | null, folder: UploadsFolder) {
    let resultPathName = undefined;
    if (file) {
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
    oldFilePathName: string = undefined,
    setFileToNull = false,
  ) {
    let resultPathName = oldFilePathName;
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

  async updateMultipleMulterFiles(
    currentPaths: string[],
    filePathsInput: string | string[],
    folder: UploadsFolder,
    newFiles?: Express.Multer.File[],
  ) {
    let filenames: string[] = filePathsInput
      ? typeof filePathsInput === 'string'
        ? [filePathsInput]
        : [...filePathsInput]
      : [];

    const newFileNames = await Promise.all(
      newFiles
        ? newFiles.map(async (image) => {
            const filename = await this.addMulterFile(image, folder);
            return filename;
          })
        : [],
    );

    const filenamesToRemain = [];

    filenames = filenames.map((filename) => {
      return normalize(filename);
    });

    currentPaths.forEach((oldImage) => {
      filenames.includes(oldImage) ? filenamesToRemain.push(oldImage) : this.deleteFile(oldImage);
    });

    filenames = [...filenamesToRemain, ...newFileNames];

    return filenames;
  }

  private async save(filePath: string, file: Buffer) {
    try {
      await writeFile(filePath, file);
    } catch (error) {
      throw error;
    }
  }
  private async delete(pathToFile: string) {
    try {
      if (existsSync(pathToFile)) {
        await rm(pathToFile);
      }
    } catch (error) {
      throw error;
    }
  }
}
