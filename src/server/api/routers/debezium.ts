import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {env} from "@/env";
import axios from "axios";

let count = 0;

export const debeziumRouter = createTRPCRouter({
    debeziumURL: publicProcedure.query(() => {
        return env.DEBEZIUM_URL;
    }),
    serverInfo: publicProcedure.query(() =>{
        return axios.get(`${env.DEBEZIUM_URL}/`)
    }),
    connectorsInfo: publicProcedure.query(() =>{
        return axios.get(`${env.DEBEZIUM_URL}/connectors?expand=info&expand=status`)
    }),
    counter: publicProcedure.query(() =>{
        count ++;
        return count.toString()
    })
});
