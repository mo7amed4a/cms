export default (policyContext, config, { strapi }) => {
    if (policyContext.state.user) { // if a session is open
      // go to next policy or reach the controller's action
      console.log(policyContext.state.user);
      console.log(config);
      console.log(strapi);
      return true;
    }
    console.log(policyContext);
    console.log(config);
    console.log(strapi);
  
    return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
  };