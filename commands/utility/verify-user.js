const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChannelType,
} = require("discord.js");
const getPad = require("../../modules/random.js");
// const config = require('../../config.json');
// const seed = config.seed;
const seed = process.env.seed;

//load in environment variables
const memberRoleId = process.env.memberRoleId;
const cosmeticRoleId = process.env.cosmeticRoleId;
const aboutRoleId = process.env.aboutRoleId;
const hobbyRoleId = process.env.hobbyRoleId;
const animeRoleId = process.env.animeRoleId;
const specialRoleId = process.env.specialRoleId;
const optRoleId = process.env.optRoleId;
const artRoleId = process.env.artRoleId;
const ramenRoleId = process.env.ramenRoleId;
const weeklyRoleId = process.env.weeklyRoleId;
const discordMod = process.env.discordMod;
module.exports = {
	data: new SlashCommandBuilder()
		.setName("verify user")
		.setDescription("verifys a user, giving them the member and cosmetic roles")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("username of the user")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("code")
				.setDescription("code recieved in email")
				.setRequired(true),
		)
		.setDefaultMemberPermissions([PermissionFlagsBits.ManageRoles]),
	async execute(interaction) {
		const user = interaction.options.getUser("user");
		const member = interaction.guild?.members.cache.get(user.id);
		const code = interaction.options.getString("code");

		if (code.toString() === getPad(user.username.toLowerCase() + seed, 6)) {
			try {
				// give immediate replu
				await interaction.deferReply({ ephemeral: true });
				// Check if the bot has permission to manage roles
				// if (!interaction.guild.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
				//     return interaction.reply({ content: 'I do not have permission to manage roles.', ephemeral: true });
				// }
				//
				// Check if the role is manageable by the bot
				// if (interaction.guild.me.roles.highest.comparePositionTo(roleToAssign) <= 0) {
				//     return interaction.reply({ content: 'I cannot assign this role because it is higher or equal to my highest role.', ephemeral: true });
				// }

				await member.roles.add(memberRoleId);
				await member.roles.add(cosmeticRoleId);
				await member.roles.add(aboutRoleId);
				await member.roles.add(hobbyRoleId);
				await member.roles.add(animeRoleId);
				await member.roles.add(specialRoleId);
				await member.roles.add(optRoleId);
				await member.roles.add(artRoleId);
				await member.roles.add(ramenRoleId);
				await member.roles.add(weeklyRoleId);
				var channel = await interaction.guild?.channels.fetch(
					process.env.welcomeChannelId.toString(),
				);
				if (channel != null && channel.type == ChannelType.GuildText) {
					await channel.send(
						`Welcome <@${user.id}> feel free to leave an introduction in <#${process.env.introductionChannelId}>`,
					);
				}
				// await channel.send('welcome!!').catch(console.error);
				// await interaction.reply({ content: `You have been successfully verified`, ephemeral: true });
				await interaction.editReply({
					content: `${user} has been successfully verified`,
					ephemeral: true,
				});
			} catch (error) {
				console.error(error);
				await interaction.editReply({
					content: `There was an error verifying ${user}, please contact <@${discordMod}> for help.`,
					ephemeral: true,
				});
			}
		} else {
			await interaction.reply({
				content: `Invalid code. Ensure form details are correct, most notably, make sure the discord tag they entered is: \`${user.username.toLowerCase()}\``,
				ephemeral: true,
			});
		}
	},
};
