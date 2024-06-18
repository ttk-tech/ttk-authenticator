/**
 * Data Transfer Object (DTO) representing the request to create a new user.
 *
 * @interface
 */

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}