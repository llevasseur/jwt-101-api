import { Knex } from "knex";
import usersData from "../seed-data/users.ts";
import postsData from "../seed-data/posts.ts";

export async function seed(knex: Knex): Promise<void> {
  console.log(usersData);
  await knex("posts").del();
  await knex("users").del();
  // Inserts seed entries
  await knex("users").insert(usersData);
  await knex("posts").insert(postsData);
}
