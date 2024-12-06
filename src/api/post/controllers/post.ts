import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user; // المستخدم المصادق عليه

      // تحقق من وجود JWT
      if (!user) {
        return ctx.unauthorized("You must be logged in to create posts");
      }

      // استخراج البيانات المرسلة من العميل
      const { data } = ctx.request.body;

      // إضافة المستخدم إلى البيانات قبل الحفظ
      const newPost = await strapi.entityService.create("api::post.post", {
        data: {
          ...data,
          users_permissions_user: user.id, // ربط البوست بالمستخدم المصادق عليه
        },
      });

      return newPost;
    },
  })
);
