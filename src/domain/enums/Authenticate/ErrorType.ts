
/**
 * Enum representing error types related to refresh token 
 *
 * @enum
 */
export enum AuthenticateErrorTypes {
  InvalidEmailOrPassword = "Email or password is invalid.",
  TokenIsMissing = "Token is missing.",
  InvalidToken = "Invalid Authorization Or Token Expire."
}