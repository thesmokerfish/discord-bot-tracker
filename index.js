const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

let guilds = [];

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
  listServers();
});

function listServers() {
  guilds = client.guilds.cache.array();

  console.log(`Liste des serveurs où se trouve le bot (${guilds.length}):`);
  console.log('----------------------------------------');

  guilds.forEach((guild, index) => {
    const voiceMembers = guild.members.cache.filter(member => member.voice.channel).size;
    const onlineMembers = guild.members.cache.filter(member => member.presence.status !== 'offline').size;
    const totalMembers = guild.memberCount;
    const boostLevel = guild.premiumTier;

    console.log(`${index + 1}. ${guild.name}`);
    console.log(`    🔊• Membres en vocal: ${voiceMembers}`);
    console.log(`    🟢• Membres connectés: ${onlineMembers}`);
    console.log(`    👥• Membres total: ${totalMembers}`);
    console.log(`    🔮• Niveau de boost: ${boostLevel}`);
  });

  console.log('----------------------------------------');
  console.log('Tapez le numéro d\'un serveur pour afficher les salons et les membres en vocal (ou tapez "q" pour quitter)');

  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function onServerSelect(input) {
    if (input.toLowerCase() === 'q') {
      rl.close();
      process.exit(0);
    }

    const serverIndex = parseInt(input) - 1;

    if (isNaN(serverIndex) || serverIndex < 0 || serverIndex >= guilds.length) {
      console.log('Numéro de serveur invalide');
      return;
    }

    const selectedGuild = guilds[serverIndex];
    const textChannels = selectedGuild.channels.cache.filter(channel => channel.type === 'text');
    const voiceChannels = selectedGuild.channels.cache.filter(channel => channel.type === 'voice');

    console.log(`Serveur sélectionné : ${selectedGuild.name}`);
    console.log('Salons textuels :');
    let channelIndex = 1;
    textChannels.forEach(channel => {
      console.log(`${channelIndex}. ${channel.name}`);
      channelIndex++;
    });

    console.log('Salons vocaux :');
    voiceChannels.forEach(channel => {
      const voiceMembers = channel.members.map(member => member.user.tag).join(', ');
      console.log(`- ${channel.name} (${voiceMembers})`);
    });

    console.log('----------------------------------------');

    rl.removeListener('line', onServerSelect); // Supprimer l'écouteur de sélection de serveur
    rl.on('line', onTextChannelSelect.bind(null, selectedGuild, textChannels)); // Ajouter l'écouteur pour sélectionner le salon textuel

    rl.prompt();
  }

  function onTextChannelSelect(selectedGuild, textChannels, input) {
    if (input.toLowerCase() === 'q') {
      rl.close();
      process.exit(0);
    }

    const channelIndex = parseInt(input);

    if (isNaN(channelIndex) || channelIndex < 1 || channelIndex > textChannels.size) {
      console.log('Numéro de salon invalide');
      return;
    }

    const selectedChannel = textChannels.array()[channelIndex - 1];
    console.log(`Salon textuel sélectionné : ${selectedChannel.name}`);

    // Récupérer les 100 derniers messages du salon textuel
    selectedChannel.messages
      .fetch({ limit: 100 })
      .then(messages => {
        console.log(`Derniers messages dans #${selectedChannel.name}:`);
        messages.forEach(message => {
          const date = message.createdAt.toLocaleDateString();
          const time = message.createdAt.toLocaleTimeString();
          console.log(`[${date} ${time}] ${message.author.tag}: ${message.content}`);
        });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des messages :', error);
      });

    console.log('----------------------------------------');
    rl.prompt();
  }

  rl.on('line', onServerSelect); // Ajouter l'écouteur pour sélectionner le serveur

  rl.prompt();
}

client.login(config.token);