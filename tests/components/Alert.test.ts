import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Alert from '~/components/Alert.vue'

describe('Alert', () => {
  it('renders slot content', async () => {
    const wrapper = await mountSuspended(Alert, {
      slots: { default: 'Test alert message' },
    })
    expect(wrapper.text()).toContain('Test alert message')
  })

  it('defaults to warning color', async () => {
    const wrapper = await mountSuspended(Alert)
    expect(wrapper.html()).toContain('warning')
  })

  it('accepts a custom color prop', async () => {
    const wrapper = await mountSuspended(Alert, {
      props: { color: 'error' },
    })
    expect(wrapper.html()).toContain('error')
  })
})
