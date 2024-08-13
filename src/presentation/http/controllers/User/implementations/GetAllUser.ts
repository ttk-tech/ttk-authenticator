import { HttpSuccess } from './../../../helpers/implementations/HttpSuccess';
import { HttpErrors } from './../../../helpers/implementations/HttpErrors';
import { IHttpRequest } from '../../../helpers/IHttpRequest';
import { IHttpResponse } from '../../../helpers/IHttpResponse';
import { IHttpErrors } from '../../../helpers/IHttpErrors';
import { HttpResponse } from '../../../helpers/implementations/HttpResponse';
import { IHttpSuccess } from '../../../helpers/IHttpSuccess';
import { ResponseDTO } from '@domain/dtos/Response';

import { IGetAllUserUseCase } from '@application/useCases/User/GetAllUser';
import { IController } from '../../IController';

/**
 * Controller for handling requests to get all users.
*/
export class GetAllUserController implements IController {

  /**
   * Creates an instance of GetAllUserController.
   * @param getAllUserUseCase The use case for get all user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAllUserUseCase: IGetAllUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) { }

  /**
   * Handles an HTTP request to get all user.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    response = await this.getAllUserUseCase.execute()
    // Get all user failed, return a 404 Not Found
    if (!response.success) {
      error = this.httpErrors.error_404()
      return new HttpResponse(error.statusCode, error.body)
    }

    // get user succeeded, return a 201 get response
    const success = this.httpSuccess.success_201(response.data.data) // hard code data.data (remove return success status)
    return new HttpResponse(success.statusCode, success.body)
  }
}