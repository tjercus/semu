export type Power = {
  actualConsumed: number;
  actualProduced: number;
  totalConsumed1: number;
  totalConsumed2: number;
  totalProduced1: number;
  totalProduced2: number;
};

export type Gas = {
  timestamp: number;
  totalConsumed: number;
};

export type Telegram = { power: Power; gas: Gas };

export const DefaultTelegram = {
  power: {
    actualConsumed: 0,
    actualProduced: 0,
    totalConsumed1: 0,
    totalConsumed2: 0,
    totalProduced1: 0,
    totalProduced2: 0,
  },
  gas: {
    timestamp: 0,
    totalConsumed: 0,
  },
};

export type ViewModel = {
  actualConsumed: string;
  actualProduced: string;
  date: string;
  isSelling: boolean;
  userId: string;
};
