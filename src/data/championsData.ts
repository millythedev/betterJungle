export const championsData = [
  {
    id: "viego",
    name: "Viego",
    title: "The Ruined King",
    image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Viego.png",
    description: "Once ruler of a long-lost kingdom, Viego perished over a thousand years ago when his attempt to bring his wife back from the dead triggered magical catastrophe known as the Ruination.",
    difficulty: 3,
    builds: [
      {
        type: "Standard",
        description: "A balanced build focusing on sustained damage and survivability.",
        itemSets: [
          {
            phase: "Starting Items",
            recommendedLevel: null,
            items: [
              {
                id: "dorans-blade",
                name: "Doran's Blade",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1055.png",
                cost: 450,
                description: "Good starting item that provides early combat stats.",
                stats: {
                  "Attack Damage": 8,
                  "Health": 80,
                  "Life Steal": "2.5%"
                }
              },
              {
                id: "health-potion",
                name: "Health Potion",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/2003.png",
                cost: 50,
                description: "Consume to restore 150 Health over 15 seconds.",
                stats: {
                  "Health Regen": "150 over 15s"
                }
              }
            ]
          },
          {
            phase: "Core Items",
            recommendedLevel: 6,
            items: [
              {
                id: "blade-of-the-ruined-king",
                name: "Blade of the Ruined King",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3153.png",
                cost: 3300,
                description: "Drains enemy champions, dealing physical damage and stealing movement speed.",
                stats: {
                  "Attack Damage": 40,
                  "Attack Speed": "25%",
                  "Life Steal": "8%"
                },
                levelScaling: {
                  "On-Hit Damage": {
                    base: 60,
                    perLevel: 4
                  }
                }
              },
              {
                id: "kraken-slayer",
                name: "Kraken Slayer",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6672.png",
                cost: 3400,
                description: "Every third attack deals bonus true damage to champions.",
                stats: {
                  "Attack Damage": 65,
                  "Attack Speed": "25%",
                  "Critical Strike Chance": "20%"
                },
                levelScaling: {
                  "True Damage": {
                    base: 60,
                    perLevel: 10
                  }
                }
              }
            ]
          },
          {
            phase: "Mid Game",
            recommendedLevel: 11,
            items: [
              {
                id: "deaths-dance",
                name: "Death's Dance",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6333.png",
                cost: 3300,
                description: "Delays damage taken and heals on takedowns.",
                stats: {
                  "Attack Damage": 55,
                  "Ability Haste": 15,
                  "Armor": 45
                }
              },
              {
                id: "steraks-gage",
                name: "Sterak's Gage",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3053.png",
                cost: 3100,
                description: "Grants a shield when taking high damage.",
                stats: {
                  "Attack Damage": 50,
                  "Health": 400
                },
                levelScaling: {
                  "Shield Strength": {
                    base: 200,
                    perLevel: 60
                  }
                }
              }
            ]
          },
          {
            phase: "Late Game",
            recommendedLevel: 16,
            items: [
              {
                id: "guardian-angel",
                name: "Guardian Angel",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3026.png",
                cost: 2800,
                description: "Revives champion upon death.",
                stats: {
                  "Attack Damage": 45,
                  "Armor": 40
                }
              },
              {
                id: "spirit-visage",
                name: "Spirit Visage",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3065.png",
                cost: 2900,
                description: "Increases all healing received.",
                stats: {
                  "Health": 450,
                  "Magic Resist": 40,
                  "Health Regen": "100%",
                  "Ability Haste": 10
                }
              }
            ]
          }
        ]
      },
      {
        type: "Burst",
        description: "Focuses on high burst damage to quickly eliminate priority targets.",
        itemSets: [
          {
            phase: "Starting Items",
            recommendedLevel: null,
            items: [
              {
                id: "dorans-blade",
                name: "Doran's Blade",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1055.png",
                cost: 450,
                description: "Good starting item that provides early combat stats.",
                stats: {
                  "Attack Damage": 8,
                  "Health": 80,
                  "Life Steal": "2.5%"
                }
              }
            ]
          },
          {
            phase: "Core Items",
            recommendedLevel: 6,
            items: [
              {
                id: "duskblade",
                name: "Duskblade of Draktharr",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6691.png",
                cost: 3200,
                description: "Attacking a champion deals bonus damage and grants invisibility on takedowns.",
                stats: {
                  "Attack Damage": 60,
                  "Ability Haste": 20,
                  "Lethality": 18
                },
                levelScaling: {
                  "Bonus Damage": {
                    base: 65,
                    perLevel: 10
                  }
                }
              },
              {
                id: "essence-reaver",
                name: "Essence Reaver",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3508.png",
                cost: 2800,
                description: "After using an ability, your next attack deals bonus damage and restores mana.",
                stats: {
                  "Attack Damage": 45,
                  "Critical Strike Chance": "20%",
                  "Ability Haste": 20
                }
              }
            ]
          }
        ]
      }
    ],
    runes: [
      {
        name: "Conqueror",
        description: "Best choice for extended fights where Viego can stack up damage over time",
        primaryPath: "Precision",
        primaryRunes: [
          {
            name: "Conqueror",
            description: "Gain stacks of Adaptive Force when attacking enemy champions. When fully stacked, heal for a portion of damage dealt to champions."
          },
          {
            name: "Triumph",
            description: "Takedowns restore health and grant bonus gold."
          },
          {
            name: "Legend: Alacrity",
            description: "Gain attack speed for every Legend stack, up to 10 stacks."
          },
          {
            name: "Coup de Grace",
            description: "Deal more damage to low health enemy champions."
          }
        ],
        secondaryPath: "Domination",
        secondaryRunes: [
          {
            name: "Sudden Impact",
            description: "Gain Lethality and Magic Penetration after using a dash, leap, blink, teleport, or leaving stealth."
          },
          {
            name: "Relentless Hunter",
            description: "Gain out-of-combat Movement Speed for each unique takedown."
          }
        ],
        statShards: ["Attack Speed", "Adaptive Force", "Armor"]
      }
    ],
    counters: {
      strongAgainst: [
        {
          champion: "Annie",
          reason: "Can easily dodge her abilities and reset with possessions"
        },
        {
          champion: "Jinx",
          reason: "Can gap close and burst her down before she can escape"
        }
      ],
      weakAgainst: [
        {
          champion: "Rammus",
          reason: "High armor makes it difficult for Viego to deal damage quickly"
        },
        {
          champion: "Malzahar",
          reason: "His suppression prevents Viego from using abilities or possessing champions"
        }
      ]
    },
    tips: [
      "Use W to stun enemies before engaging with your ultimate for guaranteed damage",
      "Try to finish enemies with your R to immediately get a possession, allowing you to continue the fight",
      "Your E grants camouflage, use it to set up ganks or escape dangerous situations",
      "Prioritize possessing enemy champions with powerful ultimates in team fights"
    ]
  },
  {
    id: "nunu",
    name: "Nunu & Willump",
    title: "The Boy and His Yeti",
    image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Nunu.png",
    description: "Once upon a time, there was a boy who wanted to prove he was a hero by slaying a fearsome monster—only to discover that the beast was a lonely yeti who just needed a friend.",
    difficulty: 2,
    builds: [
      {
        type: "Tank",
        description: "Focuses on survivability and utility to disrupt enemy teams and protect allies.",
        itemSets: [
          {
            phase: "Starting Items",
            recommendedLevel: null,
            items: [
              {
                id: "hailblade",
                name: "Hailblade",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4638.png",
                cost: 350,
                description: "Jungle starter item that enhances damage against monsters.",
                stats: {
                  "Health": 150,
                  "Omnivamp vs. Monsters": "8%"
                }
              },
              {
                id: "refillable-potion",
                name: "Refillable Potion",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/2031.png",
                cost: 150,
                description: "Refills when visiting the shop.",
                stats: {
                  "Charges": 2,
                  "Health per Charge": 125
                }
              }
            ]
          },
          {
            phase: "Core Items",
            recommendedLevel: 6,
            items: [
              {
                id: "turbo-chemtank",
                name: "Turbo Chemtank",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6664.png",
                cost: 2800,
                description: "Grants movement speed to engage enemies.",
                stats: {
                  "Health": 450,
                  "Armor": 25,
                  "Magic Resist": 25,
                  "Ability Haste": 20
                },
                levelScaling: {
                  "Movement Speed Bonus": {
                    base: 40,
                    perLevel: 2
                  }
                }
              },
              {
                id: "deadmans-plate",
                name: "Dead Man's Plate",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3742.png",
                cost: 2900,
                description: "Build momentum as you move, your next attack expends momentum to deal damage.",
                stats: {
                  "Health": 400,
                  "Armor": 45,
                  "Movement Speed": "5%"
                }
              }
            ]
          },
          {
            phase: "Mid Game",
            recommendedLevel: 11,
            items: [
              {
                id: "force-of-nature",
                name: "Force of Nature",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4401.png",
                cost: 2900,
                description: "Taking magic damage grants stacks that reduce subsequent magic damage.",
                stats: {
                  "Health": 400,
                  "Magic Resist": 60,
                  "Movement Speed": "5%"
                }
              },
              {
                id: "warmogs-armor",
                name: "Warmog's Armor",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3083.png",
                cost: 3000,
                description: "Grants massive health regeneration when out of combat.",
                stats: {
                  "Health": 800,
                  "Health Regen": "200%",
                  "Ability Haste": 10
                }
              }
            ]
          },
          {
            phase: "Late Game",
            recommendedLevel: 16,
            items: [
              {
                id: "gargoyle-stoneplate",
                name: "Gargoyle Stoneplate",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3193.png",
                cost: 3300,
                description: "Active grants a large shield, especially when surrounded by multiple enemies.",
                stats: {
                  "Armor": 60,
                  "Magic Resist": 60,
                  "Ability Haste": 15
                },
                levelScaling: {
                  "Shield Amount": {
                    base: 100,
                    perLevel: 35
                  }
                }
              },
              {
                id: "randuins-omen",
                name: "Randuin's Omen",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3143.png",
                cost: 2700,
                description: "Reduces damage from critical strikes and slows nearby enemies when activated.",
                stats: {
                  "Health": 400,
                  "Armor": 60
                }
              }
            ]
          }
        ]
      },
      {
        type: "AP",
        description: "Focuses on ability power for increased damage with Consume and Absolute Zero.",
        itemSets: [
          {
            phase: "Starting Items",
            recommendedLevel: null,
            items: [
              {
                id: "hailblade",
                name: "Hailblade",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4638.png",
                cost: 350,
                description: "Jungle starter item that enhances damage against monsters.",
                stats: {
                  "Health": 150,
                  "Omnivamp vs. Monsters": "8%"
                }
              }
            ]
          },
          {
            phase: "Core Items",
            recommendedLevel: 6,
            items: [
              {
                id: "hextech-rocketbelt",
                name: "Hextech Rocketbelt",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3152.png",
                cost: 3200,
                description: "Active dash that deals damage in an area.",
                stats: {
                  "Ability Power": 90,
                  "Health": 250,
                  "Ability Haste": 15,
                  "Magic Penetration": 6
                },
                levelScaling: {
                  "Active Damage": {
                    base: 125,
                    perLevel: 15
                  }
                }
              },
              {
                id: "cosmic-drive",
                name: "Cosmic Drive",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4629.png",
                cost: 3000,
                description: "Gain movement speed when dealing damage with abilities.",
                stats: {
                  "Ability Power": 75,
                  "Health": 250,
                  "Ability Haste": 30,
                  "Movement Speed": "5%"
                }
              }
            ]
          }
        ]
      }
    ],
    runes: [
      {
        name: "Aftershock",
        description: "Increases defenses after immobilizing an enemy, perfect for Nunu's engage style",
        primaryPath: "Resolve",
        primaryRunes: [
          {
            name: "Aftershock",
            description: "After immobilizing an enemy champion, increase Armor and Magic Resist, then explode dealing magic damage."
          },
          {
            name: "Font of Life",
            description: "Immobilizing an enemy champion marks them. Allies who attack marked champions heal over time."
          },
          {
            name: "Conditioning",
            description: "After 12 min, gain Armor and Magic Resist and increase Armor and Magic Resist by 5%."
          },
          {
            name: "Unflinching",
            description: "Gain tenacity and slow resistance. These bonuses increase when you cast Summoner Spells."
          }
        ],
        secondaryPath: "Inspiration",
        secondaryRunes: [
          {
            name: "Magical Footwear",
            description: "Receive free Slightly Magical Footwear at 12 min, but you cannot buy boots before then."
          },
          {
            name: "Cosmic Insight",
            description: "Gain 18 Summoner Spell Haste and 10 Item Haste."
          }
        ],
        statShards: ["Attack Speed", "Armor", "Health"]
      }
    ],
    counters: {
      strongAgainst: [
        {
          champion: "Karthus",
          reason: "Can interrupt Karthus' clear and outsmite with Consume + Smite combo"
        },
        {
          champion: "Kindred",
          reason: "Can counter-gank effectively and sustain through their damage"
        }
      ],
      weakAgainst: [
        {
          champion: "Olaf",
          reason: "Can ignore Nunu's CC during his ultimate and has high dueling potential"
        },
        {
          champion: "Lillia",
          reason: "Can kite Nunu easily and avoid his snowball engages"
        }
      ]
    },
    tips: [
      "Use your W (snowball) to quickly clear camps and move between objectives",
      "Your Q (consume) combined with Smite provides one of the strongest objective securing combos in the game",
      "Time your ultimate in bushes or from fog of war for maximum effectiveness",
      "Focus on securing dragons and Heralds early to help your team gain an advantage"
    ]
  },
  {
    id: "gwen",
    name: "Gwen",
    title: "The Hallowed Seamstress",
    image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/Gwen.png",
    description: "A doll brought to life by magic, Gwen wields the very tools that once created her and carries the love that made her in every stitch.",
    difficulty: 4,
    builds: [
      {
        type: "Fighter",
        description: "Focuses on sustained damage and dueling potential in the top lane.",
        itemSets: [
          {
            phase: "Starting Items",
            recommendedLevel: null,
            items: [
              {
                id: "dorans-ring",
                name: "Doran's Ring",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1056.png",
                cost: 400,
                description: "Good starting item that enhances ability power and mana regeneration.",
                stats: {
                  "Ability Power": 15,
                  "Health": 70,
                  "Mana Regeneration": "50%"
                }
              },
              {
                id: "health-potion",
                name: "Health Potion",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/2003.png",
                cost: 50,
                description: "Consume to restore health over time.",
                stats: {
                  "Health Regen": "150 over 15s"
                }
              }
            ]
          },
          {
            phase: "Core Items",
            recommendedLevel: 6,
            items: [
              {
                id: "riftmaker",
                name: "Riftmaker",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4633.png",
                cost: 3200,
                description: "Dealing damage to champions grants stacks, at max stacks deal bonus true damage and gain Omnivamp.",
                stats: {
                  "Ability Power": 80,
                  "Health": 300,
                  "Omnivamp": "7%",
                  "Ability Haste": 15
                },
                levelScaling: {
                  "True Damage": {
                    base: 3,
                    perLevel: 0.3
                  }
                }
              },
              {
                id: "nashors-tooth",
                name: "Nashor's Tooth",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3115.png",
                cost: 3000,
                description: "Basic attacks deal bonus magic damage on-hit.",
                stats: {
                  "Ability Power": 90,
                  "Attack Speed": "50%",
                  "Ability Haste": 15
                },
                levelScaling: {
                  "On-Hit Damage": {
                    base: 15,
                    perLevel: 5
                  }
                }
              }
            ]
          },
          {
            phase: "Mid Game",
            recommendedLevel: 11,
            items: [
              {
                id: "zhonyas-hourglass",
                name: "Zhonya's Hourglass",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3157.png",
                cost: 2600,
                description: "Put yourself in stasis for 2.5 seconds, rendering you untargetable and invulnerable but unable to take actions.",
                stats: {
                  "Ability Power": 65,
                  "Armor": 45,
                  "Ability Haste": 15
                }
              },
              {
                id: "demonic-embrace",
                name: "Demonic Embrace",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4637.png",
                cost: 3000,
                description: "Dealing ability damage burns enemies for max health damage over time.",
                stats: {
                  "Ability Power": 60,
                  "Health": 450
                }
              }
            ]
          },
          {
            phase: "Late Game",
            recommendedLevel: 16,
            items: [
              {
                id: "rabadons-deathcap",
                name: "Rabadon's Deathcap",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3089.png",
                cost: 3600,
                description: "Increases your total Ability Power by 35%.",
                stats: {
                  "Ability Power": 120
                }
              },
              {
                id: "void-staff",
                name: "Void Staff",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3135.png",
                cost: 2800,
                description: "Grants magic penetration.",
                stats: {
                  "Ability Power": 65,
                  "Magic Penetration": "40%"
                }
              }
            ]
          }
        ]
      },
      {
        type: "Burst",
        description: "Focuses on bursting down targets quickly with high AP.",
        itemSets: [
          {
            phase: "Starting Items",
            recommendedLevel: null,
            items: [
              {
                id: "dorans-ring",
                name: "Doran's Ring",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/1056.png",
                cost: 400,
                description: "Good starting item that enhances ability power and mana regeneration.",
                stats: {
                  "Ability Power": 15,
                  "Health": 70,
                  "Mana Regeneration": "50%"
                }
              }
            ]
          },
          {
            phase: "Core Items",
            recommendedLevel: 6,
            items: [
              {
                id: "night-harvester",
                name: "Night Harvester",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/4636.png",
                cost: 3200,
                description: "Damaging an enemy champion deals bonus magic damage and grants movement speed.",
                stats: {
                  "Ability Power": 90,
                  "Health": 300,
                  "Ability Haste": 25
                },
                levelScaling: {
                  "Bonus Damage": {
                    base: 125,
                    perLevel: 15
                  }
                }
              },
              {
                id: "lichbane",
                name: "Lich Bane",
                image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3100.png",
                cost: 3000,
                description: "After using an ability, your next attack deals bonus magic damage.",
                stats: {
                  "Ability Power": 75,
                  "Movement Speed": "8%",
                  "Ability Haste": 15
                },
                levelScaling: {
                  "Spellblade Damage": {
                    base: 75,
                    perLevel: 25
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    runes: [
      {
        name: "Conqueror",
        description: "Best for sustained fights, helps Gwen stack damage over time and heal",
        primaryPath: "Precision",
        primaryRunes: [
          {
            name: "Conqueror",
            description: "Gain stacks of Adaptive Force when attacking enemy champions. When fully stacked, heal for a portion of damage dealt to champions."
          },
          {
            name: "Triumph",
            description: "Takedowns restore health and grant bonus gold."
          },
          {
            name: "Legend: Alacrity",
            description: "Gain attack speed for every Legend stack."
          },
          {
            name: "Last Stand",
            description: "Deal more damage when you're low on health."
          }
        ],
        secondaryPath: "Resolve",
        secondaryRunes: [
          {
            name: "Bone Plating",
            description: "After taking damage from an enemy champion, reduce the damage taken from their next 3 attacks or abilities."
          },
          {
            name: "Revitalize",
            description: "Gain increased healing and shielding power. This is amplified when below 40% health."
          }
        ],
        statShards: ["Attack Speed", "Adaptive Force", "Magic Resist"]
      },
      {
        name: "Lethal Tempo",
        description: "Provides attack speed to maximize Gwen's passive damage",
        primaryPath: "Precision",
        primaryRunes: [
          {
            name: "Lethal Tempo",
            description: "Gain attack speed when attacking an enemy champion, stacking up to 6 times. At max stacks, gain attack range."
          },
          {
            name: "Presence of Mind",
            description: "Restore mana or energy on takedowns and increase energy regeneration when damaging champions."
          },
          {
            name: "Legend: Alacrity",
            description: "Gain attack speed for every Legend stack."
          },
          {
            name: "Coup de Grace",
            description: "Deal more damage to low health enemy champions."
          }
        ],
        secondaryPath: "Domination",
        secondaryRunes: [
          {
            name: "Taste of Blood",
            description: "Heal when you damage an enemy champion."
          },
          {
            name: "Ravenous Hunter",
            description: "Heal for a percentage of the damage dealt by your abilities, increased for each unique champion takedown."
          }
        ],
        statShards: ["Attack Speed", "Adaptive Force", "Armor"]
      }
    ],
    counters: {
      strongAgainst: [
        {
          champion: "Malphite",
          reason: "Can sustain through his poke and dodge his ultimate with W"
        },
        {
          champion: "Nasus",
          reason: "Can harass him early and prevent him from stacking"
        }
      ],
      weakAgainst: [
        {
          champion: "Jax",
          reason: "Can dodge her auto attacks and outscale her in duels"
        },
        {
          champion: "Warwick",
          reason: "His healing reduction and sustain make it difficult for Gwen to win trades"
        }
      ]
    },
    tips: [
      "Use your W (Hallowed Mist) strategically to block ranged attacks and abilities",
      "Your E (Skip 'n Slash) provides attack speed and on-hit healing – use it before engaging",
      "Position properly to hit enemies with the center of your Q (Snip Snip!) for maximum damage",
      "Stack your passive on minions before trading with enemies for better healing and damage"
    ]
  }
];
