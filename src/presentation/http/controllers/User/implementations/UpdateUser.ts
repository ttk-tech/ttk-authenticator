import { IUpdateUserUseCase } from "@application/useCases/User/UpdateUser";
import { IController } from "../../IController";

import { IHttpErrors } from '../../../helpers/IHttpErrors';
import { IHttpSuccess } from './../../../helpers/IHttpSuccess';
import { IHttpResponse } from "../../../helpers/IHttpResponse";

import { HttpErrors } from '../../../helpers/implementations/HttpErrors';
import { HttpSuccess } from './../../../helpers/implementations/HttpSuccess';
import { HttpRequest } from "../../../helpers/implementations/HttpRequest";
import { HttpResponse } from "../../../helpers/implementations/HttpResponse";

/**
 * Controller for handling requests to update a user.
*/
export class UpdateUserController implements IController {
  /**
   * Creates an instance of GetOneUserController.
   * @param updateUserUseCase The use case for get a user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */

  constructor(
    private updateUserUseCase: IUpdateUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) { }

  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    if (httpRequest.path && httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)
      const pathParams = Object.keys(httpRequest.path)

      if (pathParams.includes('id') &&
        bodyParams.includes('name') ||
        bodyParams.includes('email') ||
        bodyParams.includes('password')
      ) {
        const userID = (httpRequest.path as { id: string }).id
        const data = httpRequest.body as {
          name: string
          email: string
          password: string
        }
        response = await this.updateUserUseCase.execute(userID, data)
      }
      else {
        // Invalid parameters or path parameters, Return 422 Unprocessable error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // update user data fail and return 400 bad request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, error.body)
      }

      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }

}