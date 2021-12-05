import React, { FunctionComponent, useMemo, useState } from 'react'
import useIpfsFactory from "../hooks/use-ipfs-factory";

const Index: FunctionComponent = () => {
  const { ipfs } = useIpfsFactory({ commands: ['cat'] })
  const [text, setText] = useState<string | null>(null)
  const ipfsPath: string = "QmVNZKviQ5iA4nyrgtofRwGY1umVnMiVTJfxJEnNHzJBZb";

  useMemo(() => {
    if (!ipfs) {
      return;
    }


    (async () => {
      const catResults = await ipfs.cat(ipfsPath)
      let results = [];
      for await (const x of catResults) {
        results.push(new TextDecoder("utf8").decode(x))
      }

      setText(results.join(""))
    })();
  }, [ipfs, text, ipfsPath])

  return (
    <div className={"flex justify-center my-10"}>
      <div className={"hover:animate-spin m-2 p-2 text-center bg-white rounded ring-solid ring-indigo-100 ring-2"}>
        <h1 className={"font-serif text-7xl"}>
          Test Website
        </h1>
        <p className={"font-sans text"}>
          Please ignore
        </p>

        <p className={"font-sans text"}>test: {text}
        </p>
      </div>
    </div>
  );
}

export default Index
