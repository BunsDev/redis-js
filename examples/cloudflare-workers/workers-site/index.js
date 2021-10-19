import { auth, incr } from 'upstash-redis';

auth(UPSTASH_REDIS_URL, UPSTASH_REDIS_TOKEN);

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

const html = (count) => `
  <h1>Cloudflare Workers with Upstash Redis</h1>
  <h2>Count: ${count}</h2>
`;

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname !== '/') {
    return new Response();
  }

  const { data: count } = await incr('workers-count');

  return new Response(html(count), {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}