export interface ApiRequestOptions extends RequestInit {
    headers?: HeadersInit;
    body?: BodyInit | null;
}
