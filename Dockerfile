FROM oven/bun:latest
WORKDIR /opt/documentation
COPY . /opt/documentation
EXPOSE 3000
RUN bun install --production
RUN bun run build
CMD bun run serve --port 3000 --no-open