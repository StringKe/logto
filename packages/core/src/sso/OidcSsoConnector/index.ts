import { SsoProviderName } from '@logto/schemas';

import OidcConnector from '../OidcConnector/index.js';
import { type SingleSignOnFactory } from '../index.js';
import {
  SsoConnectorError,
  SsoConnectorErrorCodes,
  SsoConnectorConfigErrorCodes,
} from '../types/error.js';
import { type SingleSignOn, type SingleSignOnConnectorData } from '../types/index.js';
import { basicOidcConnectorConfigGuard } from '../types/oidc.js';

export class OidcSsoConnector extends OidcConnector implements SingleSignOn {
  constructor(readonly data: SingleSignOnConnectorData) {
    const parseConfigResult = basicOidcConnectorConfigGuard.safeParse(data.config);

    if (!parseConfigResult.success) {
      throw new SsoConnectorError(SsoConnectorErrorCodes.InvalidConfig, {
        config: data.config,
        message: SsoConnectorConfigErrorCodes.InvalidConnectorConfig,
        error: parseConfigResult.error.flatten(),
      });
    }

    super(parseConfigResult.data);
  }

  async getConfig() {
    return this.getOidcConfig();
  }

  async getIssuer() {
    return this.issuer;
  }
}

export const oidcSsoConnectorFactory: SingleSignOnFactory<SsoProviderName.OIDC> = {
  providerName: SsoProviderName.OIDC,
  logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzk5MTRfMjA2MTMpIj4KPHBhdGggZD0iTTI0IDEzLjc5OTJMMjMuNCA4LjM5OTIyTDIxLjY2IDkuNTM5MjJDMjAuMDQgOC41MTkyMiAxOCA3Ljc5OTIyIDE1LjcyIDcuNDM5MjJDMTUuNzIgNy40MzkyMiAxNC41OCA3LjE5OTIyIDEzLjA4IDcuMTk5MjJDMTEuNTggNy4xOTkyMiAxMC4yIDcuMzc5MjIgMTAuMiA3LjM3OTIyQzQuMzggOC4wOTkyMiAwIDExLjM5OTIgMCAxNS4zNTkyQzAgMTkuNDM5MiA0LjUgMjIuNzk5MiAxMS40IDIzLjM5OTJWMjEuMDU5MkM2LjY2IDIwLjM5OTIgMy42NiAxOC4xNzkyIDMuNjYgMTUuMzU5MkMzLjY2IDEyLjcxOTIgNi40MiAxMC40OTkyIDEwLjIgOS43NzkyMkMxMC4yIDkuNzc5MjIgMTMuMTQgOS4xMTkyMiAxNS43MiA5Ljg5OTIyQzE2Ljk4IDEwLjE5OTIgMTguMTIgMTAuNjE5MiAxOS4wOCAxMS4yMTkyTDE2LjggMTIuNTk5MkwyNCAxMy43OTkyWiIgZmlsbD0iIzlFOUU5RSIvPgo8cGF0aCBkPSJNMTEuMzk5OSAyLjM5OTYxVjIzLjM5OTZMMTQuOTk5OSAyMS41OTk2VjAuNTk5NjA5TDExLjM5OTkgMi4zOTk2MVoiIGZpbGw9IiNGRjk4MDAiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF85OTE0XzIwNjEzIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=',
  logoDark:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzk5MTRfMjA2MTIpIj4KPHBhdGggZD0iTTI0IDEzLjc5OTJMMjMuNCA4LjM5OTIyTDIxLjY2IDkuNTM5MjJDMjAuMDQgOC41MTkyMiAxOCA3Ljc5OTIyIDE1LjcyIDcuNDM5MjJDMTUuNzIgNy40MzkyMiAxNC41OCA3LjE5OTIyIDEzLjA4IDcuMTk5MjJDMTEuNTggNy4xOTkyMiAxMC4yIDcuMzc5MjIgMTAuMiA3LjM3OTIyQzQuMzggOC4wOTkyMiAwIDExLjM5OTIgMCAxNS4zNTkyQzAgMTkuNDM5MiA0LjUgMjIuNzk5MiAxMS40IDIzLjM5OTJWMjEuMDU5MkM2LjY2IDIwLjM5OTIgMy42NiAxOC4xNzkyIDMuNjYgMTUuMzU5MkMzLjY2IDEyLjcxOTIgNi40MiAxMC40OTkyIDEwLjIgOS43NzkyMkMxMC4yIDkuNzc5MjIgMTMuMTQgOS4xMTkyMiAxNS43MiA5Ljg5OTIyQzE2Ljk4IDEwLjE5OTIgMTguMTIgMTAuNjE5MiAxOS4wOCAxMS4yMTkyTDE2LjggMTIuNTk5MkwyNCAxMy43OTkyWiIgZmlsbD0iIzlFOUU5RSIvPgo8cGF0aCBkPSJNMTEuMzk5OSAyLjM5OTYxVjIzLjM5OTZMMTQuOTk5OSAyMS41OTk2VjAuNTk5NjA5TDExLjM5OTkgMi4zOTk2MVoiIGZpbGw9IiNGRjk4MDAiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF85OTE0XzIwNjEyIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=',
  description: {
    en: 'This connector is used to connect with OIDC single sign-on identity provider.',
  },
  name: {
    en: 'OIDC',
  },
  configGuard: basicOidcConnectorConfigGuard,
  constructor: OidcSsoConnector,
};
