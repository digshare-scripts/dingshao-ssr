import {script} from '@digshare/script';

import fetch from 'node-fetch';

interface Payload {}

interface Storage {}

const robotFetch = (url: string) =>
  fetch(url, {
    headers: {
      'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
    },
  }).then(async res =>
    res.status === 500 ? Promise.reject({url, html: await res.text()}) : true,
  );

export default script<Payload, Storage>(async (payload, {storage}) => {
  return Promise.all([
    // site
    robotFetch('https://www.dingshao.cn/'),
    // channel
    robotFetch('https://www.dingshao.cn/share/channel/ctGFCB'),
    // message
    robotFetch('https://www.dingshao.cn/share/message/pRiqbl'),
  ]).then(
    () => {
      console.log("It's OK ~");
    },
    ({url, html}) => {
      console.error({url, html});

      return {
        content: `它挂啦它挂啦，它带着 \`500\` 走来啦`,
        links: [url],
      };
    },
  );
});
