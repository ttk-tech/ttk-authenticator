// test mark: test combine dto
export namespace UserDTO {
  export interface ICreateUserRequestDTO {
    name: string;
    email: string;
    password: string;
  }

  export interface IUpdateUserRequestDTO {
    name: string;
    email: string;
    password: string;
  }
}