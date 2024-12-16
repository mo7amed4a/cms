import type { StrapiApp } from "@strapi/strapi/admin";

// import logo from "./extensions/mohamed.jpg";

export default {
  config: {
    auth: {
      // logo,
    },
    head: {
      // logo,
    },
    menu: {
      // logo,
    },
    translations: {
      en: {
        "app.components.HomePage.welcome.again": "Webbing Agency",
        "app.components.HomePage.welcomeBlock.content.again":
          "Transforming Ideas into Digital Solutions",
        "app.components.HomePage.button.blog": "Visit Blog",
        "app.components.HomePage.community.links.blog": "Community Blog",
        "app.components.HomePage.roadmap": "Roadmap",
        "app.components.LeftMenu.navbrand.title": "My App Dashboard",

        // إضافة محتوى جديد
        "app.components.HomePage.newSection.title": "New Section Title",
        "app.components.HomePage.newSection.content":
          "This is the content for the new section.",

        "app.components.BlockLink.cloud": "Cloud Service",
        "app.components.BlockLink.cloud.href": "https://example.com",

        "app.components.LeftMenu.navbrand.workplace": "Testing",

        "Auth.form.welcome.title": "Webbing Agency",

        "Auth.form.welcome.subtitle": "Login to your account",

        "Settings.profile.form.section.experience.interfaceLanguageHelp":
          "Preference changes will apply only to you.",
      },
    },
    // Disable video tutorials
    tutorials: false,
    router() {
      console.log("fkm");
    },

    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  register(app: StrapiApp) {
    const indexRoute = app.router.routes.find(({ index }) => index);

    if (!indexRoute) throw new Error("unable to find index page");
    

    // indexRoute.lazy = async () => {
    //   const { App } = await import("./pages/home");
    //   return { Component: App };
    // };

    if (indexRoute) {
      indexRoute.children?.push({
        path: 'hamo',
        lazy: async () => {
          const { AboutPage } = await import("./pages/AboutPage");
          return { Component: AboutPage };
        },
      })
      indexRoute.lazy = async () => {
        const { App } = await import("./pages/home");
        return { Component: App };
      };

      console.log(indexRoute);
      
    }

    // const indexRoute2 = app.router.routes.find(({ path }) => path === '/about');

    // if (!indexRoute2) throw new Error("unable to find index page");

    // indexRoute2.lazy= async () => {
    //   const {AboutPage} = await import("./pages/AboutPage");
    //   return { Component: AboutPage };
    // }
  },
};
