#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

# если вы публикуете по адресу https://<USERNAME>.github.io/<REPO>
git push -f sweta-89-@mail.ru:<ivveta>/<office-map>.git master:gh-pages

cd -