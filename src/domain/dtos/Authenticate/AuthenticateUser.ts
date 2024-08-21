/**
 * Data Transfer Object (DTO) representing a authenticate user.
 *
 * @interface
 */
export interface IAuthenticateUserDTO {
  /**
   * The user email identifier for the user.
   */
  email: string

  /**
    * The password of user.
    */
  password: string
}