import { DeleteUserUseCase } from '@application/useCases/User/implementations/DeleteUser';
import { ResponseDTO } from "@domain/dtos/Response";

import { IController } from "../../IController";

import { IHttpErrors } from '../../../helpers/IHttpErrors';
import { IHttpSuccess } from './../../../helpers/IHttpSuccess';
import { IHttpResponse } from "../../../helpers/IHttpResponse";

import { HttpErrors } from '../../../helpers/implementations/HttpErrors';
import { HttpSuccess } from './../../../helpers/implementations/HttpSuccess';
import { HttpRequest } from "../../../helpers/implementations/HttpRequest";
import { HttpResponse } from "../../../helpers/implementations/HttpResponse";


/**
 * Controller for handling request to delete a user
 */
export class DeleteUserController implements IController {

  /**
   * Creates an instance of CreateUserController.
   * @param deleteUserUseCase The use case for delete a user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private deleteUserUseCase: DeleteUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) { }

  /**
   * Handles an HTTP request to delete a user.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.path && Object.keys(httpRequest.path).length > 0) {
      const pathParams = Object.keys(httpRequest.path)

      if (pathParams.includes('id')) {
        const userID = (httpRequest.path as { id: string }).id

        // Execute the delete user use case
        response = await this.deleteUserUseCase.execute(userID)
      }
      else {
        // Invalid request body parameters, return 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Delete user failed, return a 400 Bad Request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, error.body)
      }

      // Delete user succeeded, return a 201 Delete response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request path, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}