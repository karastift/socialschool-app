import { Cache, QueryInput } from "@urql/exchange-graphcache";
import { QueryResult } from "@urql/exchange-graphcache/dist/types/operations/query";

export function betterUpdateQuery(
    cache: Cache,
    qi: QueryInput,
    result: QueryResult,
    fn: any) {
    return cache.updateQuery(qi, data => fn(result, data));
}
