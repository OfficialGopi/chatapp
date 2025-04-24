declare global {
  namespace Express {
    export interface Request {
      user?: {
        [key: string]: any;
      };
      validatedData?: {
        [key: string]: any;
      };
    }
  }
}
export {};
