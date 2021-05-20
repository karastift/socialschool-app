export function betterUpdateQuery(
    cache,
    qi,
    result,
    fn) {
    return cache.updateQuery(qi, data => fn(result, data));
}
