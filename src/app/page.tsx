import {api} from "@/trpc/server";
import "@/app/style.css";

export default async function Home() {
    try {
        const debeziumServerInfo = await (await api.debezium.serverInfo()).json()
        const debeziumConnectorsInfo = await (await api.debezium.connectorsInfo()).json()

        return (
            <main
                className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-5 ">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        Debezium GUI
                    </h1>
                </div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>State</th>
                            <th>Worker ID</th>
                            <th>Tasks</th>
                            <th>Config</th>
                        </tr>
                        {Object.keys(debeziumConnectorsInfo).map((item: any) =>
                            <tr>
                                <td key="item" className="font-bold">{debeziumConnectorsInfo[item].info.name}</td>
                                <td>{debeziumConnectorsInfo[item].info.type}</td>
                                <td>{debeziumConnectorsInfo[item].status.connector.state}</td>
                                <td>{debeziumConnectorsInfo[item].status.connector.worker_id}</td>
                                <td>
                                    <ul className="mb-3">
                                        {debeziumConnectorsInfo[item].status.tasks.map((task: any) => {
                                            return <li className="flex flex-col">
                                                <span>ID: {task.id}</span>
                                                <span>State: {task.state}</span>
                                                <span>Worker ID: {task.worker_id}</span>
                                                <span>{task.trace}</span>
                                            </li>
                                        })}
                                    </ul>
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        {Object.keys(debeziumConnectorsInfo[item].info.config).map((obj: any) => {
                                            return <span>{obj}: {debeziumConnectorsInfo[item].info.config[obj]}</span>
                                        })}
                                    </div>

                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-row justify-center m-6">
                    <span>version/{debeziumServerInfo.version} - commit/{debeziumServerInfo.commit} - kafkaClusterId/{debeziumServerInfo.kafka_cluster_id}</span>
                </div>
            </main>
        );
    } catch (e) {
        return (<main>
            <span>Something went wrong</span>
        </main>)
    }
}