const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const getPad = require('../../modules/random.js');
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
const verifyChannelId = process.env.verifyChannelId;
const discordMod = process.env.discordMod;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('verifys a user, giving them the member and cosmetic roles')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('code recieved in email')
                .setRequired(true)),
    async execute(interaction) {
        
        const code = interaction.options.getString('code');

        // Check if the user provided the correct password
        if (interaction.channelId !== verifyChannelId) { // verification-general
            return interaction.reply({ content: `This command can only be used in <#${verifyChannelId}>`, ephemeral: true });
        }
        if (code.toString() === getPad(interaction.user.username.toLowerCase() + seed, 6)) {
            try {
                // Check if the bot has permission to manage roles
                // if (!interaction.guild.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
                //     return interaction.reply({ content: 'I do not have permission to manage roles.', ephemeral: true });
                // }

                // Check if the role is manageable by the bot
                // if (interaction.guild.me.roles.highest.comparePositionTo(roleToAssign) <= 0) {
                //     return interaction.reply({ content: 'I cannot assign this role because it is higher or equal to my highest role.', ephemeral: true });
                // }

                await interaction.member.roles.add(memberRoleId);
                await interaction.member.roles.add(cosmeticRoleId);
                await interaction.member.roles.add(aboutRoleId);
                await interaction.member.roles.add(hobbyRoleId);
                await interaction.member.roles.add(animeRoleId);
                await interaction.member.roles.add(specialRoleId);
                await interaction.member.roles.add(optRoleId);
                await interaction.reply({ content: `You have been successfully verified`, ephemeral: true });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: `There was an error verifying you, please contact <@${discordMod}> for help.`, ephemeral: true });
            }
        } else {
            await interaction.reply({ content: `Invalid code`, ephemeral: true });
        }
    },
};

