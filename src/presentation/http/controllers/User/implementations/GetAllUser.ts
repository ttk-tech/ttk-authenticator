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


export class GetAllUserController implements IController {

  constructor(
    private getAllUserUseCase: IGetAllUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess()
  ) { }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    response = await this.getAllUserUseCase.execute()

    if (!response.success) {
      error = this.httpErrors.error_404()
      return new HttpResponse(error.statusCode, error.body)
    }

    const success = this.httpSuccess.success_201(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}