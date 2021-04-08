# Build

Maybe use `--env-file` next time... [See Ref.](http://docs.podman.io/en/latest/markdown/podman-run.1.html#environment)

```console
podman build -t agritoca-image .
podman pod create -n agritoca-pod -p 3000:3000
podman run --pod agritoca-pod --name agritoca-db -e POSTGRES_PASSWORD=mdmundo -e POSTGRES_DB=agritoca-db -e POSTGRES_USER=mdmundo -d postgres
podman run --pod agritoca-pod --name agritoca-server -e PORT=3000 -e DB_URL=postgres://mdmundo:mdmundo@localhost:5432/agritoca-db -e JWT_SECRET=ly98ZyM2NZo66UE4wE2Q5gJtIhh9EvddaiYlM6wbkteyhAtNnw5zBJdpLMvQ0Vg -e SALT=agritoca-api -d agritoca-image
```

# Migrate and Seed DB

```console
podman exec -ti agritoca-server npm run migrate
podman exec -ti agritoca-server npm run seed
```

# Save or Load

```console
podman build -t agritoca-image .
podman save > agritoca-image.tar agritoca-image
podman load < agritoca-image.tar
```
