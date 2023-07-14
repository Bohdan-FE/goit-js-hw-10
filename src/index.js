import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const el = {
  select: document.querySelector('#single'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

function createOptions({ id, name }) {
  return `<option class="option" value="${id}">${name}</option>`;
}

function createCatcard({ url, breeds: [{ name, description, temperament }] }) {
  return `<img src="${url}" alt="${name}" width="400">
    <h3>${name}</h3>
    <p>${description}</p>
    <p><b>Temperament:&nbsp</b>${temperament}</p>`;
}

fetchBreeds()
  .then(responce => {
    el.select.hidden = false;
    el.select.innerHTML = responce.data
      .map(item => createOptions(item))
      .join('');
    const slim = new SlimSelect({
      select: '#single',
      events: {
        afterChange: newVal => {
          el.loader.hidden = false;
          el.catInfo.innerHTML = '';
          fetchCatByBreed(newVal[0].value)
            .then(responce => {
              el.catInfo.innerHTML = responce.data
                .map(item => createCatcard(item))
                .join('');
            })
            .catch(() => {
              Notify.failure(el.error.textContent);
            })
            .finally(() => el.loader.hidden = true);
        },
      },
    });
  })
  .catch(() => Notify.failure(el.error.textContent))
  .finally(() => el.loader.hidden = true);
