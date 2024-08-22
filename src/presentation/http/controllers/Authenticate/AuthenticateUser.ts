import { IController } from '@presentation/http/controllers/IController'
import { IHttpErrors } from '@presentation/http/helpers/IHttpErrors'
import { IHttpRequest } from '@presentation/http/helpers/IHttpRequest'
import { IHttpResponse } from '@presentation/http/helpers/IHttpResponse'
import { IHttpSuccess } from '@presentation/http/helpers/IHttpSuccess'
import { HttpErrors } from '@presentation/http/helpers/implementations/HttpErrors'
import { HttpResponse } from '@presentation/http/helpers/implementations/HttpResponse'
import { HttpSuccess } from '@presentation/http/helpers/implementations/HttpSuccess'

import { IAuthenticateUserUseCase } from '@application/useCases/Authenticate/AuthenticateUser'

import { ResponseDTO } from '@domain/dtos/Response'

/**
 * Controller for handling requests to refresh authentication tokens.
 */
export class AuthenticateUserController implements IController {
  
  /**
   * Creates an instance of AuthenticateUserController.
   * @param authenticateUserUseCase The use case for authentication user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private authenticateUserUseCase: IAuthenticateUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) { }

  /**
   * Handles an HTTP request to authentication user.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (bodyParams.includes('email') && bodyParams.includes('password')) {
        // Extract authentication data from the request body
        const createUserRequestDTO = httpRequest.body as {
          email: string
          password: string
        }
        // Execute the authenticate user use case
        response = await this.authenticateUserUseCase.execute(createUserRequestDTO)
      }
      else {
        // Invalid request body parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Authentication failed, return a 400 Bad Request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Authentication succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}

