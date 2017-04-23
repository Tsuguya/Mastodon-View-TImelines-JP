import instances from './instances.yml';

function request(number) {
  const instance = instances[number];
  const url = `${instance}api/v1/timelines/public?local=local`;

  return fetch(url)
    .then(response => response.json())
    .then(response => response.map((toot) => {
      if (toot.account.avatar[0] === `/`) {
        Object.assign(toot.account, { avatar: instance + toot.account.avatar });
      }
      Object.assign(toot, { key: toot.id });
      return toot;
    }));
}

export default request;
