export class HttpError extends Error {
  constructor(status, message, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export const notFound = (message = "Not Found") => new HttpError(404, message);
