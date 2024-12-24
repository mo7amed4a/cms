import type { Schema, Struct } from '@strapi/strapi';

export interface ServicesServiceComponent extends Struct.ComponentSchema {
  collectionName: 'components_services_service_components';
  info: {
    displayName: 'serviceComponent';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'services.service-component': ServicesServiceComponent;
    }
  }
}
