docker start 05899 &&
cd /home/blog/app/nextjs-demo-1&&
git pull &&
yarn install --production=false&&
yarn m:run&&
git apply entity.patch&&
yarn typeorm:build&&
yarn build&&
git reset --hard HEAD&&Ï
docker kill app&&
docker rm app&&
docker build . -t yang/node-web-app&&
docker run --network=host --name app -p 3200:3200 -d yang/node-web-app&&
echo 'OKK!'


