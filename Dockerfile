FROM imbios/bun-node:23-slim AS builder

WORKDIR /app

COPY . .
RUN bun install && bun run build

FROM nginx:alpine-slim as production
ENV NODE_ENV production
RUN echo c2VydmVyIHsKICAgIGxpc3RlbiA4MDsKICAgIGxvY2F0aW9uIC8gewogICAgICAgIHJvb3QgL3Vzci9zaGFyZS9uZ2lueC9odG1sOwogICAgICAgIGluY2x1ZGUgL2V0Yy9uZ2lueC9taW1lLnR5cGVzOwogICAgICAgIHRyeV9maWxlcyAkdXJpICR1cmkvIC9pbmRleC5odG1sOwogIH0KfQo= > /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
