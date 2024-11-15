import { decodeJwt, jwtVerify } from 'jose'
import Cookies from 'js-cookie'
import {
	AccessTokenCookie,
	IsAuthorizedCookie,
	RefreshTokenCookie,
} from '../constants/cookies'
import { JWT_SECRET } from '../constants/secrets'
import { JWTToken } from '../types/jwt.types'

export function GetAccessToken() {
	return Cookies.get(AccessTokenCookie)
}

export function GetRefreshToken() {
	return Cookies.get(RefreshTokenCookie)
}

export function GetIsAuthorized() {
	return Cookies.get(IsAuthorizedCookie)
}

export function RemoveAccessToken() {
	return Cookies.remove(AccessTokenCookie)
}

export function RemoveRefreshToken() {
	return Cookies.remove(RefreshTokenCookie)
}

export function RemoveIsAuthorized() {
	return Cookies.remove(IsAuthorizedCookie)
}

export function SetCookie(name: string, value: string) {
	Cookies.set(name, value)
}

export async function DecodeToken(token: string) {
	try {
		const res = (await decodeJwt(token)) as JWTToken
		return res
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error('Error while decoding token: ', err.message)
		}
	}
}

export async function ValidateToken(token: string) {
	try {
		await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
		return true
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error('Ошибка при валидации токена: ', err.message)
		}
		return false
	}
}
