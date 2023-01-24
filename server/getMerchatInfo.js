const getMerchatInfo = async (ctx, accessToken, shop) => {
  const query = JSON.stringify({
    query: `query {
      shop {
        name
        id
      }
    }
    `
  });

  const response = await fetch(`https://${shop}/admin/api/2019-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "X-Shopify-Access-Token": accessToken,
    },
    body: query
  });

  const responseJson = await response.json();
 // const confirmationUrl = responseJson.data.appSubscriptionCreate.confirmationUrl;
  
  // return ctx.redirect(confirmationUrl);
  //console.log('yo', confirmationUrl);
};

module.exports = getMerchatInfo;