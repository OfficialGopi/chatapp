class ApiResponse {
  public statusCode: number;
  public data: {
    [key: string]: any;
  };
  public message: string;
  public success: boolean;

  constructor(
    statusCode: number,
    data: {
      [key: string]: any;
    },
    message = "Success",
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
