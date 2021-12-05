import React, { FunctionComponent, useEffect, useState } from 'react'
import useIpfsFactory from "../hooks/use-ipfs-factory";

const Index: FunctionComponent = () => {
  const { ipfs, isIpfsReady, ipfsInitError } = useIpfsFactory({ commands: ['cat'] })
  const [text, setText] = useState<string | null>(null)
  const ipfsPath: string = "QmVNZKviQ5iA4nyrgtofRwGY1umVnMiVTJfxJEnNHzJBZb";

  if (ipfsInitError) {
    console.error("Ipfs failed to start", ipfsInitError)
  }

  useEffect(() => {
    if (!ipfs) {
      return;
    }

    (async () => {
      const catChunks = await ipfs.cat(ipfsPath)
      let results = [];
      for await (const chunk of catChunks) {
        results.push(new TextDecoder("utf8").decode(chunk))
      }

      setText(results.join(""))
    })();
  }, [ipfs, text, ipfsPath, isIpfsReady])

  return (
    <div className={"flex justify-center my-10"}>
      <div className={"m-2 p-2 text-center bg-white rounded ring-solid ring-indigo-100 ring-2"}>
        <h1 className={"font-serif text-7xl"}>
          Test Website
        </h1>
        <p className={"font-sans text"}>
          Please ignore
        </p>

        {text ? <div className={"font-sans text transition-all duration-400"}>{text}</div>: <div className={"blur filter line-clamp-1"}>Neque porro quisquam est </div>}
      </div>
    </div>
  );
}

export default Index
