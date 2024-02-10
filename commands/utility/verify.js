const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.json');
const SECRET_PASSWORD = "123"; // Store your password securely

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('verifys a user, giving them the member and cosmetic roles')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('code recieved in email')
                .setRequired(true)),
    async execute(interaction) {
        const inputPassword = interaction.options.getString('code');

        // Check if the user provided the correct password
        if (interaction.channelId !== config.verifyChannelId) { // verification-general
            return interaction.reply({ content: 'This command can only be used in the verify channel.', ephemeral: true });
        }
        if (inputPassword === SECRET_PASSWORD) {
            try {
                // Check if the bot has permission to manage roles
                // if (!interaction.guild.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
                //     return interaction.reply({ content: 'I do not have permission to manage roles.', ephemeral: true });
                // }

                // Check if the role is manageable by the bot
                // if (interaction.guild.me.roles.highest.comparePositionTo(roleToAssign) <= 0) {
                //     return interaction.reply({ content: 'I cannot assign this role because it is higher or equal to my highest role.', ephemeral: true });
                // }

                await interaction.member.roles.add(config.memberRoleId);
                await interaction.member.roles.add(config.cosmeticRoleId);
                await interaction.member.roles.add(config.aboutRoleId);
                await interaction.member.roles.add(config.hobbyRoleId);
                await interaction.member.roles.add(config.animeRoleId);
                await interaction.member.roles.add(config.specialRoleId);
                await interaction.member.roles.add(config.optRoleId);
                await interaction.reply({ content: `You have been successfully verified`, ephemeral: true });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error trying to assign the role.', ephemeral: true });
            }
        } else {
            await interaction.reply({ content: 'Incorrect password. You cannot be assigned this role.', ephemeral: true });
        }
    },
};

