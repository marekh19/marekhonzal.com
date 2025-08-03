const MESSAGE_DURATION = 700 // ms

const labels = {
  default: 'Copy',
  success: 'Copied',
  failed: 'Failed',
} as const

const createCopyButton = (pre: HTMLPreElement): HTMLButtonElement => {
  const code = pre.querySelector('code')
  if (!code) throw new Error('<pre> block has no <code>')

  const button = document.createElement('button')
  button.type = 'button'
  button.textContent = labels.default

  let timeoutId: number | undefined

  const resetLabel = () => {
    button.textContent = labels.default
    timeoutId = undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  button.addEventListener('click', async () => {
    if (timeoutId) clearTimeout(timeoutId)

    try {
      await navigator.clipboard.writeText(code.innerText)
      button.textContent = labels.success
    } catch {
      button.textContent = labels.failed
    }

    timeoutId = window.setTimeout(resetLabel, MESSAGE_DURATION)
  })

  return button
}

const enhanceCodeBlocks = () => {
  const blocks = document.querySelectorAll('pre')

  blocks.forEach((pre) => {
    if (!(pre instanceof HTMLPreElement)) return

    const wrapper = document.createElement('div')
    wrapper.classList.add('code-block')

    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const button = createCopyButton(pre)
    wrapper.appendChild(button)
  })
}

window.addEventListener('DOMContentLoaded', enhanceCodeBlocks)
