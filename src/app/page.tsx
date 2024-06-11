import {api} from "@/trpc/server";

export default async function Home() {
    const debeziumServerInfo = await (await api.debezium.serverInfo()).json()
    const debeziumConnectorsInfo = await (await api.debezium.connectorsInfo()).json()

  return (
    <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Debezium GUI
        </h1>
        <div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold my-3">Server:</h1>
                <span>Version: {debeziumServerInfo.version}</span>
                <span>Commit: {debeziumServerInfo.commit}</span>
                <span>Kafka Cluster ID: {debeziumServerInfo.kafka_cluster_id}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold my-3">Connectors:</h1>
                {Object.keys(debeziumConnectorsInfo).map(item => (
                    <div className="flex flex-col items-center justify-center my-3">
                        <h3 className="font-bold text-1xl">{item}</h3>
                        <pre><code>{JSON.stringify(debeziumConnectorsInfo[item].status.connector.state)}</code></pre>
                        <h3 className="font-bold text-lg">Tasks</h3>
                        <ul>
                        {(debeziumConnectorsInfo[item].status.tasks).sort((a:any, b:any) => {return a.id - b.id}).map((element: any) => {
                            return <li key={item + element.id} className="font-bold">- {`id: ${element.id}, state: ${element.state}, worker id: ${element.worker_id}`}</li>
                        })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </main>
  );
}