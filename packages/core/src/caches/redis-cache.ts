import { CacheStore } from '#src/caches/types.js';
import { createClient, RedisClientType } from 'redis';
import { EnvSet } from '#src/env-set/index.js';
import { conditional, Optional, yes } from '@silverhand/essentials';
import { appInsights } from '@logto/app-insights/lib/node.js';
import { consoleLog } from '#src/utils/console.js';

export class RedisCache implements CacheStore {
  readonly client?: RedisClientType;

  constructor() {
    const { redisUrl } = EnvSet.values;

    if (redisUrl) {
      this.client = createClient({
        url: conditional(!yes(redisUrl) && redisUrl),
      });
      this.client.on('error', (error) => {
        appInsights.trackException(error);
      });
    }
  }

  async set(key: string, value: string, expire: number = 30 * 60) {
    await this.client?.set(key, value, {
      EX: expire,
    });
  }

  async get(key: string): Promise<Optional<string>> {
    return conditional(await this.client?.get(key));
  }

  async delete(key: string) {
    await this.client?.del(key);
  }

  async connect() {
    if (this.client) {
      await this.client.connect();
      const pong = await this.client.ping();

      if (pong === 'PONG') {
        consoleLog.info('[CACHE] Connected to Redis');
        return;
      }
    }
    consoleLog.warn('[CACHE] No Redis client initialized, skipping');
  }

  async disconnect() {
    if (this.client) {
      await this.client.disconnect();
      consoleLog.info('[CACHE] Disconnected from Redis');
    }
  }
}
