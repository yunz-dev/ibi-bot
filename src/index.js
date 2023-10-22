import { Client } from 'discord.js';
import {config} from 'dotenv';

config(); //loading in env 

const client = new Client({intents: ['Guilds', 'GuildMessages']});
const TOKEN = process.env.BOT_TOKEN;  
client.login(TOKEN);
