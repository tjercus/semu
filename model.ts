import { DefaultTelegram, Telegram, ViewModel } from "./types.ts";
import { toNumber } from "./utils.ts";
import * as ramda from "https://deno.land/x/ramda@v0.27.2/mod.ts";

const { last } = ramda;

/**
 * Are we producing more than consuming?
 */
export const isSelling = (produced: number, consumed: number) =>
  produced > consumed;

/**
 * Create a ViewModel ready for the View to use
 */
export const makeViewModel = (
  db: Array<Telegram>,
  userId: string,
): ViewModel => {
  const latestTelegram: Telegram = last(db) || DefaultTelegram;
  return {
    actualProduced: toNumber(latestTelegram.power.actualProduced).toFixed(3)
      .toString(),
    actualConsumed: toNumber(latestTelegram.power.actualConsumed).toFixed(3)
      .toString(),
    date: new Date().toLocaleString("nl-NL"),
    isSelling: isSelling(
      toNumber(latestTelegram.power.actualProduced),
      toNumber(latestTelegram.power.actualConsumed),
    ),
    userId,
  };
};
