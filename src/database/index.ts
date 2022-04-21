import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "rentalx"
});

dataSource.initialize();
