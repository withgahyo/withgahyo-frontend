import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/api/auth.ts', import.meta.url), 'utf8')

test('social login requests allow a sleeping backend to start', () => {
  for (const provider of ['kakao', 'google']) {
    const call = source.match(
      new RegExp(`'/api/v1/auth/login/${provider}',\\s*request,\\s*\\{\\s*timeout:\\s*([\\d_]+),?\\s*\\}`),
    )

    assert.ok(call, `${provider} login must set a request-specific timeout`)
    assert.ok(Number(call[1].replaceAll('_', '')) >= 240_000)
  }
})
