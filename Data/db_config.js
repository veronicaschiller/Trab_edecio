import knex from "knex";
import { development } from "../knexFile";

const connection = knex(development)

export default connection;