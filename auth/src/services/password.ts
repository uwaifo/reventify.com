import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
export class Password {
  //STATIC Methods are accessible without creating instances of a class

  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    //Wrapping the await expression to inform typescript of the type as being "Buffer"
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    //So the hashed password is concatenated with the salt used in hashing it , seperated by "."
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");

    const buf = (await scryptAsync(storedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}

//Example showing no need for using the "new" instantiation ketword
//Password.toHash()
