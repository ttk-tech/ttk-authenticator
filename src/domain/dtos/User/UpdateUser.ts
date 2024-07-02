/**
 * Data Transfer Object (DTO) representing the request to update a user data.
 *
 * @interface
 */

export interface IUpdateUserRequestDTO {
  name?: string;
  email?: string;
  password?: string;
}