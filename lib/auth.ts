import crypto from 'crypto'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'portfolio_admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 12

function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required for admin authentication`)
  }

  return value
}

function createSignature(payload: string) {
  const secret = getRequiredEnv('ADMIN_SESSION_SECRET')

  return crypto.createHmac('sha256', secret).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer)
}

export function validateAdminCredentials(username: string, password: string) {
  const expectedUsername = getRequiredEnv('ADMIN_USERNAME')
  const expectedPassword = getRequiredEnv('ADMIN_PASSWORD')

  return safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword)
}

export function createSessionToken(username: string) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000
  const payload = `${username}.${expiresAt}`
  const signature = createSignature(payload)

  return `${payload}.${signature}`
}

export function verifySessionToken(token?: string | null) {
  if (!token) {
    return null
  }

  const [username, expiresAtRaw, signature] = token.split('.')

  if (!username || !expiresAtRaw || !signature) {
    return null
  }

  const payload = `${username}.${expiresAtRaw}`
  const expectedSignature = createSignature(payload)

  if (!safeEqual(signature, expectedSignature)) {
    return null
  }

  const expiresAt = Number(expiresAtRaw)

  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return null
  }

  return {
    username,
    expiresAt,
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)?.value

  return verifySessionToken(session)
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminSession())
}

export async function setAdminSession(username: string) {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
