module.exports = {
  getDeathMessage
}

function getDeathMessage(deathKey, entityName, attackerName, itemName) {
  switch (deathKey) {
    case 'death.attack.anvil':
      msg = `${entityName} was squashed by a falling anvil`;
      return msg;
    case 'death.attack.arrow':
      msg = `${entityName} was shot by ${attackerName}`;
      return msg;
    case 'death.attack.arrow.item':
      msg = `${entityName} was shot by ${attackerName} using _${itemName}_`;
      return msg;
    case 'death.attack.bullet':
      msg = `${entityName} was sniped by ${attackerName}`;
      return msg;
    case 'death.attack.cactus':
      msg = `${entityName} was pricked to death`;
      return msg;
    case 'death.attack.cactus.player':
      msg = `${entityName} walked into a cactus whilst trying to escape ${attackerName}`;
      return msg;
    case 'death.attack.drown':
      msg = `${entityName} drowned`;
      return msg;
    case 'death.attack.drown.player':
      msg = `${entityName} drowned whilst trying to escape ${attackerName}`;
      return msg;
    case 'death.attack.explosion':
      msg = `${entityName} blew up`;
      return msg;
    case 'death.attack.explosion.by.bed':
      msg = `${entityName} was killed by [Intentional Game Design]`;
      return msg;
    case 'death.attack.explosion.player':
      msg = `${entityName} was blown up by ${attackerName}`;
      return msg;
    case 'death.attack.fall':
      msg = `${entityName} hit the ground too hard`;
      return msg;
    case 'death.attack.fallingBlock':
      msg = `${entityName} was squashed by a falling block`;
      return msg;
    case 'death.attack.fireball':
      msg = `${entityName} was fireballed by ${attackerName}`;
      return msg;
    case 'death.attack.fireball.item':
      msg = `${entityName} was fireballed by ${attackerName} using _${itemName}_`;
      return msg;
    case 'death.attack.fireworks':
      msg = `${entityName} went off with a bang`;
      return msg;
    case 'death.attack.flyIntoWall':
      msg = `${entityName} experienced kinetic energy`;
      return msg;
    case 'death.attack.generic':
      msg = `${entityName} died`;
      return msg;
    case 'death.attack.indirectMagic':
      msg = `${entityName} was killed by ${attackerName} using magic`;
      return msg;
    case 'death.attack.indirectMagic.item':
      msg = `${entityName} was killed by ${attackerName} using _${itemName}_`;
      return msg;
    case 'death.attack.inFire':
      msg = `${entityName} went up in flames`;
      return msg;
    case 'death.attack.inFire.player':
      msg = `${entityName} walked into fire whilst fighting ${attackerName}`;
      return msg;
    case 'death.attack.inWall':
      msg = `${entityName} suffocated in a wall`;
      return msg;
    case 'death.attack.lava':
      msg = `${entityName} tried to swim in lava`;
      return msg;
    case 'death.attack.lava.player':
      msg = `${entityName} tried to swim in lava to escape ${attackerName}`;
      return msg;
    case 'death.attack.lightningBolt':
      msg = `${entityName} was struck by lightning`;
      return msg;
    case 'death.attack.maceSmash.player':
      msg = `${entityName} was smashed by ${attackerName}`;
      return msg;
    case 'death.attack.maceSmash.player.item':
      msg = `${entityName} was smashed by ${attackerName} with _${itemName}_`;
      return msg;
    case 'death.attack.magic':
      msg = `${entityName} was killed by magic`;
      return msg;
    case 'death.attack.magma':
      msg = `${entityName} discovered the floor was lava`;
      return msg;
    case 'death.attack.magma.player':
      msg = `${entityName} walked on danger zone due to ${attackerName}`;
      return msg;
    case 'death.attack.mob':
      msg = `${entityName} was slain by ${attackerName}`;
      return msg;
    case 'death.attack.mob.item':
      msg = `${entityName} was slain by ${attackerName} using _${itemName}_`;
      return msg;
    case 'death.attack.onFire':
      msg = `${entityName} burned to death`;
      return msg;
    case 'death.attack.onFire.player':
      msg = `${entityName} was burnt to a crisp whilst fighting ${attackerName}`;
      return msg;
    case 'death.attack.outOfWorld':
      msg = `${entityName} fell out of the world`;
      return msg;
    case 'death.attack.player':
      msg = `${entityName} was slain by ${attackerName}`;
      return msg;
    case 'death.attack.player.item':
      msg = `${entityName} was slain by ${attackerName} using _${itemName}_`;
      return msg;
    case 'death.attack.spit':
      msg = `${entityName} was spitballed by ${attackerName}`;
      return msg;
    case 'death.attack.starve':
      msg = `${entityName} starved to death`;
      return msg;
    case 'death.attack.sweetBerry':
      msg = `${entityName} was poked to death by a sweet berry bush`;
      return msg;
    case 'death.attack.thorns':
      msg = `${entityName} was killed trying to hurt ${attackerName}`;
      return msg;
    case 'death.attack.thrown':
      msg = `${entityName} was pummeled by ${attackerName}`;
      return msg;
    case 'death.attack.thrown.item':
      msg = `${entityName} was pummeled by ${attackerName} using _${itemName}_`;
      return msg;
    case 'death.attack.trident':
      msg = `${entityName} was impaled to death by ${attackerName}`;
      return msg;
    case 'death.attack.wither':
      msg = `${entityName} withered away`;
      return msg;
    case 'death.attack.freeze':
      msg = `${entityName} froze to death`;
      return msg;
    case 'death.attack.sonicBoom':
      msg = `${entityName} was obliterated by a sonically-charged shriek`;
      return msg;
    case 'death.attack.sonicBoom.player':
      msg = `${entityName} was obliterated by a sonically-charged shriek whilst trying to escape ${attackerName}`;
      return msg;
    case 'death.attack.stalactite':
      msg = `${entityName} was skewered by a falling stalactite`;
      return msg;
    case 'death.attack.stalagmite':
      msg = `${entityName} was impaled on a stalagmite`;
      return msg;
    case 'death.fell.accident.generic':
      msg = `${entityName} fell from a high place`;
      return msg;
    case 'death.fell.accident.ladder':
      msg = `${entityName} fell off a ladder`;
      return msg;
    case 'death.fell.accident.vines':
      msg = `${entityName} fell off some vines`;
      return msg;
    case 'death.fell.accident.water':
      msg = `${entityName} fell out of the water`;
      return msg;
    case 'death.fell.assist':
      msg = `${entityName} was doomed to fall by ${attackerName}`;
      return msg;
    case 'death.fell.assist.item':
      msg = `${entityName} was doomed to fall by ${attackerName} using _${itemName}_`;
      return msg;
    case 'death.fell.finish':
      msg = `${entityName} fell too far and was finished by ${attackerName}`;
      return msg;
    case 'death.fell.finish.item':
      msg = `${entityName} fell too far and was finished by ${attackerName} using _${itemName}_`;
      return msg;
    case 'death.fell.killer':
      msg = `${entityName} was doomed to fall`;
      return msg;
    default:
      msg = `${entityName} died mysteriously`;
      return msg;
  }
}
