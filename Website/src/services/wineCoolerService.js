const serviceBase = '/api/wines/';

export const getWines = () => {
  return new Promise((resolve, reject) => {
    const url = `${serviceBase}`;
    fetch(`${url}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then((response) => {
      if (response.ok) {
        console.log(`received ok response:  ${JSON.stringify(response)}`);
        response.text().then(resolve);
      } else {
        throw new Error(`failed to fetch: ${response.statusText}`);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};

export const getStats = () => {
  return new Promise((resolve, reject) => {
    const url = `${serviceBase}stats`;
    fetch(`${url}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }).then((response) => {
      if (response.ok) {
        response.text().then(resolve);
      } else {
        throw new Error(`failed to fetch: ${response.statusText}`);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};

export const postWine = (vinmonopoletId, request) => {
  return new Promise((resolve, reject) => {
    const url = `${serviceBase}${vinmonopoletId}`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:
      `{
          "status": "${request.status}",
          "storage": "${request.storage || false}",
          "count": "${request.count || 1}",
          "name": "${request.name || ''}",
          "country": "${request.country || ''}",
          "type": "${request.type || ''}",
          "area": "${request.area || ''}",
          "producer": "${request.producer || ''}",
          "vintage": "${request.vintage || ''}",
          "fruit": "${request.fruit || ''}",
          "price": "${request.price || ''}",
       }`,
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        response.text().then(resolve);
      } else if (response.status === 400) {
        reject('Vinmonopolet id was not found in register, try adding the information manually');
      } else {
        reject(response.statusText);
      }
    });
  });
};

export const setWineStatus = status => (id, formData) => {
  return new Promise((resolve, reject) => {
    const url = `${serviceBase}${status}/${id}`;
    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: formData !== undefined ? `{ "occation": "${formData.occation}", "note": "${formData.note}" }` : '',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        response.text().then(resolve);
      } else {
        throw new Error(`failed to update entity: ${response.statusText}`);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};
