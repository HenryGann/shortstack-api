interface UrlMapping {
    short: string;
    long: string;
    ttl: number;
}

interface APIResponse {
    success: boolean;
    message?: string;
}

export { UrlMapping, APIResponse };