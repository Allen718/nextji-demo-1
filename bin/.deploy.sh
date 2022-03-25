docker start 98a&&
cd /home/blog/app/nextjs-demo-1&&
git pull&&
yarn install --production=false&&
yarn build&&
docker kill app&&
docker rm app&&
docker build . -t yang/node-web-app&&
docker run --network=host --name app -p 3200:3200 -d yang/node-web-app&&
echo 'ok!'


