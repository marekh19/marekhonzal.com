const MESSAGE_DURATION = 1500 // ms

const labels = {
  default: 'Copy',
  success: 'Copied',
  failed: 'Failed',
} as const

type CopyState = keyof typeof labels

const createLabels = (): HTMLSpanElement => {
  const wrapper = document.createElement('span')
  wrapper.classList.add('copy-labels')

  for (const [state, label] of Object.entries(labels)) {
    const span = document.createElement('span')
    span.dataset.label = state
    span.textContent = label
    wrapper.appendChild(span)
  }

  return wrapper
}

const createCopyButton = (pre: HTMLPreElement): HTMLButtonElement => {
  const code = pre.querySelector('code')
  if (!code) throw new Error('<pre> block has no <code>')

  const button = document.createElement('button')
  button.type = 'button'
  button.appendChild(createLabels())

  const setState = (state: CopyState) => {
    button.dataset.state = state
  }
  setState('default')

  let timeoutId: number | undefined

  const resetLabel = () => {
    setState('default')
    timeoutId = undefined
  }

  button.addEventListener('click', async () => {
    if (timeoutId) clearTimeout(timeoutId)

    try {
      await navigator.clipboard.writeText(code.innerText)
      setState('success')
    } catch {
      setState('failed')
    }

    timeoutId = window.setTimeout(resetLabel, MESSAGE_DURATION)
  })

  return button
}

const enhanceCodeBlocks = () => {
  const blocks = document.querySelectorAll('pre')

  blocks.forEach((pre) => {
    if (!(pre instanceof HTMLPreElement)) return
    if (pre.parentElement?.classList.contains('code-block')) return

    const wrapper = document.createElement('div')
    wrapper.classList.add('code-block', 'group')

    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const button = createCopyButton(pre)
    wrapper.appendChild(button)
  })
}

enhanceCodeBlocks()
