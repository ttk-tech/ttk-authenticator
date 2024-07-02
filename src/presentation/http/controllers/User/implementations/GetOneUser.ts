import { IGetOneUserUseCase } from '@application/useCases/User/GetOneUser';
import { ResponseDTO } from '@domain/dtos/Response';

import { HttpSuccess } from './../../../helpers/implementations/HttpSuccess';
import { HttpErrors } from './../../../helpers/implementations/HttpErrors';
import { IHttpRequest } from '../../../helpers/IHttpRequest';
import { IHttpResponse } from '../../../helpers/IHttpResponse';
import { IHttpErrors } from '../../../helpers/IHttpErrors';
import { HttpResponse } from '../../../helpers/implementations/HttpResponse';
import { IHttpSuccess } from '../../../helpers/IHttpSuccess';

import { IController } from '../../IController';


/**
 * Controller for handling requests to get a user.
*/
export class GetOneUserController implements IController {
  /**
   * Creates an instance of GetOneUserController.
   * @param getOneUserUseCase The use case for get a user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getOneUserUseCase: IGetOneUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) { }

  /**
   * Handles an HTTP request to get a user.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (bodyParams.includes('userEmail')) {
        const userEmail = (httpRequest.body as { userEmail: string }).userEmail
        response = await this.getOneUserUseCase.execute(userEmail)
      }
      else {
        // Invalid request body parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }
      if (!response.success) {
        // get user failed, return a 400 Bad Request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, error.body)
      }
      // get user succeeded, return a 201 get response
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }


    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}