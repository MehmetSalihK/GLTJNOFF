const Discord = require('discord.js');
var dernierAppel = new Array();

exports.run = async (bot, message, args) => {
  message.delete();
  
  if(message.content.substring(0, 7) == `${message.prefix}report`)
        {
            message.delete (30);
            var commande = message.content.split(" ");
            
            if(typeof commande[1] === 'undefined')
            {
                if(message.author.bot === false)
                {
                    // Nom d'utilisateur pas entré = afficher l'aide
                    message.channel.send({embed: {
   color: 1127128,
  description: `<a:attention:630345321825828894> | **Aide pour la commande report :** \n\n Pour rapporter un ou plusieurs utilisateurs ayant un comportement inapproprié, mettre le nom ou les noms des utilisateurs après la commande report. \n\n Vous pouvez également rajouter une raison particulière avec l'attribut\n \`${message.prefix}raison "Votre Raison"\`. \n\n Ne vous amusez pas à abuser cette commande à tout va, merci :wink: ! \n\n **Exemple 1 :** \`${message.prefix}report @utilisateur\` \n **Exemple 2 :** \`${message.prefix}report @utilisateur1 @utilisateur2\`\n **Exemple 3 :** \`${message.prefix}report @utilisateur1 -raison \"Une raison\"\``
}});
                }
            }
            else
            {
                // Vérifier les noms + raison de signalement
                var verifNom = true;
                var raisonSignalement = null;
                var inOptionRaison = false;
                
                for(var i = 1; i < commande.length; i++)
                {
                    // Les noms des personnes citées commencent par "<", le caractère suivant étant @
                    if(commande[i].charAt(1) !== "@")
                    {
                        // On ne prend pas en compte l'option -r (raison)
                        if(commande[i].substring(0, 4) == `${message.prefix}rasion `)
                        {
                            raisonSignalement = commande[i].substring(3);
                            inOptionRaison = true;
                        }
                        else
                        {
                            if(inOptionRaison == false)
                            {	
                                verifNom = false;
                            }
                            else
                            {
                                raisonSignalement = raisonSignalement + " " + commande[i];
                            }
                        }
                    }
                }
                
                if(verifNom === true)
                {
                    // Vérification des abus
                    var aAppele = false;
                    for(var i = 0; i < dernierAppel.length; i++)
                    {
                        if(dernierAppel[i][0] == message.author.id)
                        {
                            // Un signalement toutes les 3 minutes autorisé
                            if((message.createdTimestamp - dernierAppel[i][1]) < 180000)
                            {
                                aAppele = true;
                            }
                            else
                            {
                                aAppele = false;
                                dernierAppel.splice(i, 1);
                            }
                        }
                    }
                    
                    if(aAppele == false)
                    {
                        dernierAppel.push([message.author.id, message.createdTimestamp]);
                        
                        var moderateurs = new Array();
                        
                        var sontAvertis = true;
                        
                        message.channel.guild.roles.forEach(function(role)
                        {
                            // Chercher les modérateurs parmi tous les rôles
                            
                            if (role.hasPermission('BAN_MEMBERS'))
                            {
                                role.members.forEach(function(member)
                                {
                                    var estDejaPrevenu = false;
                                    for(var j = 0; j < moderateurs.length; j++)
                                    {
                                        if(member == moderateurs[j])
                                        {
                                            // Est déjà prévenu
                                            estDejaPrevenu = true;
                                        }
                                    }
                                        
                                    if(estDejaPrevenu == false)
                                    {
                                        moderateurs.push(member);
                                    
                                        // Fonction conversion timestamp -> Date
                                        function timeConverter(timestamp)
                                        {
                                            var a = new Date(timestamp);
										var tabMois = ['Janvier','Février','Mars','Avril','Mais','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
										var annee = a.getFullYear();
										var mois = tabMois[a.getMonth()];
										var date = a.getDate();
										var heure = a.getHours();
										var min = a.getMinutes();
										var sec = a.getSeconds();
										var time = "le " + date + ' ' + mois + ' ' + annee + ' à ' + heure + 'h' + min + ':' + sec ;
										return time;
									}
									
									// Reporter les utilisateurs
									var MP = "Un rapport soumis " + timeConverter(message.createdTimestamp) + " par **" + message.author.username + "** a été effectué à l'encontre de ";
									
									message.mentions.users.forEach(function(user)
									{
										MP = MP + `${user.username}#${user.id}` + " ";
									});
									
									MP =  MP + "sur " + member.guild.name + " " + message.channel.name + "bot";
									
									// Prise en charge de la raison du signalement
									if(raisonSignalement != null)
									{
										MP = MP + " pour la raison suivante : " + raisonSignalement + "bot";
									}
									
									try
									{
										member.user.sendMessage(MP);
									}
									catch(e)
									{
										sontAvertis = false;
									}
								}
							});
						}
					});
					
					if(sontAvertis == true)
					{
						message.reply("Signalement effectué! <a:loading:630345357267697675>");
                        }
                    }
                }
            }
        }
    };

exports.help = {
  name: 'report'
};