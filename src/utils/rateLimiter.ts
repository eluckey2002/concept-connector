export const createRateLimiter = (maxRequests: number, timeWindow: number) => {
  const requests: number[] = [];
  return () => {
    const now = Date.now();
    requests.push(now);
    const recentRequests = requests.filter(time => (now - time) < timeWindow);
    requests.length = recentRequests.length;
    return requests.length <= maxRequests;
  };
}; 