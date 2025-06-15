# Service Library

To create the service library, use your cli of choice to generate it

## Parts of the Library

1. The Injectable Service, your angular gets and posts and whatever else
2. The Injection Token to provide a way of configuring where your service will make those calls to
3. Environment setup, providing the required props in environment
4. Provide the InjectionToken in your app config
5. Injecting your service that should now be ready for consumption

## File Replacement

If the configuration to switch between environment files hasn't been done already

look into your `apps/[project-name]/project.json`

You'll want to find the `build.configuration` section for the different environments

In general, you'll want to have an environment file for each environment you plan to deploy to +1.

For example, if you have a QA environment, and production environment, that's 3 environment files

```
  environment.ts
  environment.qa.ts
  environment.prod.ts
```

By default, production and development come preconfigured by NX.

You should be able to open `project.json` and file `build.configuration.production` and `build.configuration.development`
