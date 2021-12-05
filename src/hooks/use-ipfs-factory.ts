import { create, IPFS } from 'ipfs-core'
import { useEffect, useState } from 'react'

let ipfs: null | IPFS = null

/*
 * A quick demo using React hooks to create an ipfs instance.
 *
 * Hooks are brand new at the time of writing, and this pattern
 * is intended to show it is possible. I don't know if it is wise.
 *
 * Next steps would be to store the ipfs instance on the context
 * so use-ipfs calls can grab it from there rather than expecting
 * it to be passed in.
 */

type FactoryOptions = { commands: string[] }
type WindowWithIpfs = Window & typeof globalThis & { ipfs?: { enable: (some: FactoryOptions) => IPFS } };

export default function useIpfsFactory(options: FactoryOptions) {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
  const [ipfsInitError, setIpfsInitError] = useState(null)

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs()
    return function cleanup() {
      if (ipfs && ipfs.stop) {
        ipfs.stop().catch((err: unknown) => console.error(err))
        ipfs = null
        setIpfsReady(false)
      }
    }
  }, [])

  async function startIpfs() {
    let browser: undefined | WindowWithIpfs = window

    if (ipfs) {
    } else if (browser && browser?.ipfs && browser?.ipfs?.enable) {
      ipfs = await browser.ipfs.enable(options)
    } else {
      try {
        ipfs = await create()
      } catch (error) {
        ipfs = null
        setIpfsInitError(error)
      }
    }

    setIpfsReady(Boolean(ipfs))
  }

  return { ipfs, isIpfsReady, ipfsInitError }
}
