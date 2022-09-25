import knex from "knex";
import { development } from "../knexFile.js";

const connection = knex(development)

export default connection;