FROM gcr.io/distroless/nodejs22-debian12
ENV NODE_ENV=production

# Set cache directory to writable location
ENV NEXT_CACHE_DIR=/tmp/.next/cache

WORKDIR /app

COPY .next/standalone /app/
COPY .next/static ./.next/static

USER nonroot

EXPOSE 3000

CMD ["server.js"]