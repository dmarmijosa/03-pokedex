export interface HttpAdapter {
  get<A>(url: string): Promise<A>;
}
