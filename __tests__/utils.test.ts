import { cn } from '../src/lib/utils'

describe('cn utility', () => {
  it('merges class names with spaces', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles undefined values', () => {
    expect(cn('foo', undefined)).toBe('foo')
  })

  it('merges tailwind classes and resolves conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
