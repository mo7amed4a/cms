import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectsMobileOneImages extends Struct.ComponentSchema {
  collectionName: 'components_projects_mobile_one_images';
  info: {
    displayName: 'MobileOneImages';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
  };
}

export interface ProjectsMobileTwoImages extends Struct.ComponentSchema {
  collectionName: 'components_projects_mobile_two_images';
  info: {
    displayName: 'MobileTwoImages';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
  };
}

export interface ProjectsWebsiteImages extends Struct.ComponentSchema {
  collectionName: 'components_projects_website_images';
  info: {
    description: '';
    displayName: 'websiteImages';
  };
  attributes: {
    dashboard: Schema.Attribute.Media<'images' | 'files'>;
    images: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
    web: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required;
  };
}

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
      'projects.mobile-one-images': ProjectsMobileOneImages;
      'projects.mobile-two-images': ProjectsMobileTwoImages;
      'projects.website-images': ProjectsWebsiteImages;
      'services.service-component': ServicesServiceComponent;
    }
  }
}
