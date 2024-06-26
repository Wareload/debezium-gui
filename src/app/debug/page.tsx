"use server"
import {api} from "@/trpc/server";

export default async function Home() {
  try{
  const debeziumUrl = await api.debezium.debeziumURL()
  const debeziumServerInfo = await (await api.debezium.serverInfo()).json()
  const debeziumConnectorsInfo = await (await api.debezium.connectorsInfo()).json()


  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">Debug</h1>
      </div>
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center justify-center px-4 gap-2">
          <span className="font-bold underline">Server Info: </span>
          <pre className="whitespace-pre-wrap break-all">
            <code>
              {JSON.stringify(debeziumServerInfo)}
              </code>
          </pre>
        </div>
        <div className="flex flex-col items-center justify-center px-4 gap-2">
          <span className="font-bold underline">Connector Info:</span>
          <pre className="whitespace-pre-wrap break-all">
            <code>
              {JSON.stringify(debeziumConnectorsInfo)}
              </code>
          </pre>
        </div>
        <div className="flex flex-col items-center justify-center px-4 gap-2">
          <span className="font-bold underline">Debezium URL: </span>
          <span>{debeziumUrl}</span>
        </div>
      </div>
    </main>
  );
  } catch (e) {
    return (<main>
      <span>Something went wrong</span>
    </main>)
  }
}

