/**
 * contact controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact.contact', ({ strapi }) => ({
  async checkAllData(ctx) {
    try {
      const contacts = await strapi.entityService.findMany('api::contact.contact');

      const allDataOk = contacts.every(contact => contact.read === true);

      if (allDataOk) {
        return ctx.send({ message: 'All data is OK!' });
      } else {
    }
    return ctx.send({ message: 'Some data is not OK.' });
    } catch (error) {
      return ctx.badRequest('Error checking data');
    }
  },
  async readAllData(ctx) {
    try {
        const updatedCount: any = await strapi.db.query('api::contact.contact').updateMany({
          where: { read: false }, // تصفية البيانات حيث read = false
          data: { read: true }, // تحديث الحقل read إلى true
        });

        console.log(updatedCount);
        
  
        // إذا لم يتم تحديث أي سجلات
        if (updatedCount === 0) {
          return ctx.send({ message: 'No data to update.' });
        }
  
        return ctx.send({ message: `Updated ${updatedCount} records successfully!` });
      } catch (error) {
        return ctx.badRequest('Error updating data');
      }
    }
}));