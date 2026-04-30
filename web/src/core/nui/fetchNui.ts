// ============================================================
// fetchNui — FiveM NUI → Game communication
// ============================================================

const IS_BROWSER = !navigator.userAgent.includes('CitizenFX');

/**
 * Call a NUI callback registered on the client-side Lua script.
 * @param eventName  The event name registered with RegisterNUICallback
 * @param data       Payload to send
 * @param mockData   Value returned in browser dev mode
 */
export async function fetchNui<T = unknown>(
  eventName: string,
  data?: unknown,
  mockData?: T,
): Promise<T> {
  if (IS_BROWSER) {
    console.log(`[fetchNui] ${eventName}`, data);
    await new Promise((r) => setTimeout(r, 100));
    return mockData as T;
  }

  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data ?? {}),
  };

  const resourceName = (window as Window & { GetParentResourceName?: () => string })
    .GetParentResourceName?.() ?? 'nui-frame-app';

  const res = await fetch(`https://${resourceName}/${eventName}`, options);

  if (!res.ok) {
    throw new Error(`[fetchNui] ${eventName} failed — ${res.status}`);
  }

  return res.json() as Promise<T>;
}
