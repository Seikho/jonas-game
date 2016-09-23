import { EventEmitter } from 'events';

const emitter = new EventEmitter();

type Event = 'damage'

interface Entity {
  id: 1;
  name: string;
  health: number;
}

interface Weapon {
  weight?: number;
  damage?: number;
}

const players: Array<Entity> = [];

const playerJonas: Entity = {
  id: 1,
  name: 'Jonas',
  health: 100
}

const rock: Weapon = {
  weight: 50
}

players.push(playerJonas);

export function dealDamage(entity: Entity, weapon: Weapon) {
  const damage = weapon.damage || weapon.weight;
  entity.health -= damage;
  emitter.emit('damage', entity, damage);
}

function emitDamage(entity: Entity, damage: number) {
  emitter.emit('damage', entity, damage);
}

emitter.on('damage', (entity: Entity, damage: number) => {
  console.log(`Player ${entity.name} suffered ${damage} damage`);
  if (entity.health > 0) return;

  console.log(`Player ${entity.name} has died`);
});


dealDamage(playerJonas, rock);
dealDamage(playerJonas, rock);