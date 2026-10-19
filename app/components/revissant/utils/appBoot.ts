/**
 * Fica `true` depois do primeiro mount da app no cliente (ver PageLayout).
 * Durante a hidratação do documento ainda é `false`, o que distingue o
 * carregamento inicial de uma navegação client-side — `location.key` não
 * serve, porque o React Router o recupera do history.state num reload.
 */
export const appBoot = {done: false};
