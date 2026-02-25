import { GameStore } from './game.store';
import { TestBed } from '@angular/core/testing';

describe('GameStore', () => {
  it('should deduct gold correctly', () => {
    const store = TestBed.inject(GameStore);

    // Manually set initial state for test
    (store as any).gameState.set({ resources: { gold: 100, wood: 50 } });

    store.spendResources(20, 10);

    expect(store.gameState()?.resources.gold).toBe(80);
    expect(store.gameState()?.resources.wood).toBe(40);
  });
});
