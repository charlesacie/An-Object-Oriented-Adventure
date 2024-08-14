const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
      name: "Leo",
      type: "Cat",
      companion: {
        name: "Frank",
        type: "Flea",
        inventory: ["small hat", "sunglasses"]
      }
    },
    roll(mod = 0) {
      const result = Math.floor(Math.random() * 20) + 1 + mod;
      console.log(`${this.name} rolled a ${result}.`);
    }
  };
  
  for (let item of adventurer.inventory) {
    console.log(item);
  }

  adventurer.roll();

  class Character {
    constructor(name) {
      this.name = name;
      this.health = Character.MAX_HEALTH;
      this.inventory = [];
    }
  
    roll(mod = 0) {
      const result = Math.floor(Math.random() * 20) + 1 + mod;
      console.log(`${this.name} rolled a ${result}.`);
    }
  
    static MAX_HEALTH = 100;
  }
  
  const robin = new Character("Robin");
  robin.inventory = ["sword", "potion", "artifact"];
  robin.companion = new Character("Leo");
  robin.companion.type = "Cat";
  robin.companion.companion = new Character("Frank");
  robin.companion.companion.type = "Flea";
  robin.companion.companion.inventory = ["small hat", "sunglasses"];
  
  robin.roll();
  robin.companion.roll();
  robin.companion.companion.roll();
  
  class Adventurer extends Character {
    constructor(name, role) {
      super(name);
      this.role = role;
      this.inventory.push("bedroll", "50 gold coins");
    }
  
    scout() {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }
  
    static ROLES = ["Fighter", "Healer", "Wizard"];
  
    static isValidRole(role) {
      return Adventurer.ROLES.includes(role);
    }
  }
  
  class Companion extends Character {
    constructor(name, type) {
      super(name);
      this.type = type;
    }
  
    play() {
      console.log(`${this.name} is playing!`);
    }
  }
  
  const robinAdventurer = new Adventurer("Robin", "Fighter");
  const leoCompanion = new Companion("Leo", "Cat");
  const frankCompanion = new Companion("Frank", "Flea");
  frankCompanion.inventory = ["small hat", "sunglasses"];
  leoCompanion.companion = frankCompanion;
  robinAdventurer.companion = leoCompanion;
  
  robinAdventurer.scout();
  leoCompanion.play();
  frankCompanion.play();
  
  console.log(`Max Health: ${Character.MAX_HEALTH}`);
  console.log(`Valid Roles: ${Adventurer.ROLES.join(", ")}`);
 
  class AdventurerFactory {
    constructor(role) {
      if (!Adventurer.isValidRole(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      this.role = role;
      this.adventurers = [];
    }
  
    generate(name) {
      const newAdventurer = new Adventurer(name, this.role);
      this.adventurers.push(newAdventurer);
      return newAdventurer;
    }
  
    findByIndex(index) {
      return this.adventurers[index];
    }
  
    findByName(name) {
      return this.adventurers.find((a) => a.name === name);
    }
  }
  
  const healers = new AdventurerFactory("Healer");
  const healerRobin = healers.generate("Robin");
  
  console.log(healers.findByName("Robin"));