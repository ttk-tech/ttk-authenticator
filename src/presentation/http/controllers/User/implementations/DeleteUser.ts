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

  constructor(
    private deleteUserUseCase: DeleteUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) { }


  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.path && Object.keys(httpRequest.path).length > 0) {
      const pathParams = Object.keys(httpRequest.path)

      if (pathParams.includes('id')) {
        const userID = (httpRequest.path as { id: string }).id
        response = await this.deleteUserUseCase.execute(userID)
      }
      else {
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, error.body)
      }
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}