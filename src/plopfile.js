module.exports = ( plop ) => {

    // Here we'll define our generators
  
    // We declare a new generator called "module"
    plop.setGenerator( "crud-fire-service", {
        // Succintly describes what generator does.
        description: "Create a new service",
        prompts: [
            {
              type: "input",
              name: "name",
              message: "What is your service name?"
            }
        ],
        actions: [
            {
              type: "add",
              path: "app/services/{{dashCase name}}/{{dashCase name}}.service.ts",
              templateFile: "plop-templates/service.ts"
            },
            {
              type: "add",
              path: "app/services/{{dashCase name}}/{{dashCase name}}.spec.ts",
              templateFile: "plop-templates/service.spec.ts"
            },
            {
                type: "append",
                path: "app/services/service-export.ts",
                template: "export * from './{{dashCase name}}/{{dashCase name}}.service';"
            },
        ]
    });
};