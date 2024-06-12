import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {env} from "@/env";


export const debeziumRouter = createTRPCRouter({
    debeziumURL: publicProcedure.query(() => {
        return env.DEBEZIUM_URL;
    }),
    serverInfo: publicProcedure.query(() =>{
        return fetch(`${env.DEBEZIUM_URL}/`, { next: { revalidate: 5 }})
    }),
    connectorsInfo: publicProcedure.query(() =>{
        return fetch(`${env.DEBEZIUM_URL}/connectors?expand=info&expand=status`, { next: { revalidate: 5 }})
    }),
});
