export function uniqueID(): string {
	return new Crypto().randomUUID();
}