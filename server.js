require("isomorphic-fetch");
const dotenv = require("dotenv");
dotenv.config();
const Koa = require("koa");
const next = require("next");
const { default: createShopifyAuth } = require("@shopify/koa-shopify-auth");
const { verifyRequest } = require("@shopify/koa-shopify-auth");
const session = require("koa-session");
const { default: graphQLProxy } = require("@shopify/koa-shopify-graphql-proxy");

const { ApiVersion } = require("@shopify/koa-shopify-graphql-proxy");
const Router = require("koa-router");
const {
  receiveWebhook,
  registerWebhook
} = require("@shopify/koa-shopify-webhooks");
const getSubscriptionUrl = require("./server/getSubscriptionUrl");
const getMerchatInfo = require("./server/getMerchatInfo");
const proxy = require("koa-proxies");
const httpsProxyAgent = require("https-proxy-agent");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
var cookie = require("cookie");
var $ = require("jquery");
const bodyParser = require('koa-bodyparser');

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  // server.use(session(server));

  server.use(session({ secure: false, sameSite: false }, server));
  server.use(bodyParser({    
    formLimit: '1mb',
    jsonLimit: '1mb',
    textLimit: '1mb',
  }));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ["read_products", "write_products", "read_customers"],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;

        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false
          // secure: true,
          // sameSite: 'none'
        });
        await getMerchatInfo(ctx, accessToken, shop);
        console.log("shop 1", shop);
        console.log("accessToken 1", accessToken);
        ctx.redirect("/");




         // const registration = await registerWebhook({
      //   address: `${HOST}/webhooks/products/create`,
      //   topic: 'PRODUCTS_CREATE',
      //   accessToken,
      //   shop,
      //   apiVersion: ApiVersion.October19
      // });

      // if (registration.success) {
      //   console.log('Successfully registered webhook!');
      // } else {
      //   console.log('Failed to register webhook', registration.result);
      // }
     
      // await getSubscriptionUrl(ctx, accessToken, shop);
      // await getMerchatInfo(ctx, accessToken, shop);

      }

     
    })
    
  );

  server.use(
    proxy("/dev/merchant", {
      target: "https://wyv4u4u1ud.execute-api.us-west-1.amazonaws.com",
      changeOrigin: true,
      rewrite: path => path.replace(/^\/createuser(\/|\/\w+)?$/, "/sample"),
      logs: true
    })
  );

  server.use(proxy("/proxy/d", {}));

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });
  server.use(graphQLProxy({ version: ApiVersion.April19 }));

  /*===  getProductScore Feature  ===*/
  router.get("/proxy/d", async(ctx, next) => {
    var getCallData = ctx.request.body;
    var storeData = {
      chatHeaderColor: "Red",
      buttonColor: "Red",
      chatHeaderTextColor: "Red",
      buttonTextColor: "Red",
      platform: "Shopify",
      merchantId: "123456"
    };


    new Promise((resolve, reject) => {
      // Set Variables
      var platform = "0001";
      var merchantId = storeData.merchantId;
      var url = `https://wyv4u4u1ud.execute-api.us-west-1.amazonaws.com/dev/merchant?platform=${platform}&merchantId=${merchantId}`;
      var settings = {
        url: url,
        method: "GET",
        timeout: 0
      };

      //Make API Call
      $.ajax(settings).done(function(response) {
        console.log(response);

        resolve();
      });
    }).then(() => {
      // Step : Get current merchant info
      var productScoreObj = {
        product: getCallData.product,
        user: getCallData.customer,
        merchant: this.state.merchantObj
      };
      var settings = {
        url:
          "https://wyv4u4u1ud.execute-api.us-west-1.amazonaws.com/dev/calculate-score",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify(productScoreObj)
      };

      // Step : Make AJAX call to get Product Score
      $.ajax(settings).done(function(response) {
        console.log(response);
        var productScoreObj = {
          productScore: response,
          chatHeaderColor: storeData.chatHeaderColor,
          buttonColor: storeData.buttonColor,
          chatHeaderTextColor: storeData.chatHeaderTextColor,
          buttonTextColor: storeData.buttonTextColor
        };
        ctx.body = productScoreObj;
      });
    });
  });

  router.post("/dev/merchant", async ctx => {
    console.log("ctx.req", ctx.req);
    await handle(ctx.req, ctx.res);
    ctx.res.statusCode = 200;
  });

  router.post("/proxy/editColors", async ctx => {
    console.log("ctx.req bdoy editColors", ctx.request.body);

    const merchantReqBody = ctx.request.body;
    // gid://shopify/Shop/252443353193",
     console.log(typeof merchantReqBody);


    var merchantobj = {
      "id": merchantReqBody.id,
      "platform": "Shopify",
      "productIngredients": "1",
      "productTexture": [
          "2",
          "7"
      ],      
      "chatHeaderColor": merchantReqBody.chatHeaderColor,
      "buttonColor": merchantReqBody.buttonColor,
      "chatHeaderTextColor": merchantReqBody.chatHeaderTextColor,
      "buttonTextColor": merchantReqBody.buttonTextColor,
      "name": "<string>",
      "products": [
        {
          "id": "gid://shopify/Product/3632125083753",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Moisture RX Hawaiian Ginger Moisturizing Scalp Treatment"
        },
        {
          "id": "gid://shopify/Product/3632125116521",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Moisture RX Hawaiian Ginger Moisturizing Styling Gel"
        },
        {
          "id": "gid://shopify/Product/3632125182057",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Moisture RX Hawaiian Ginger Moisturizing Overnight Conditioner"
        },
        {
          "id": "gid://shopify/Product/3632125247593",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Moisture RX Hawaiian Ginger Moisturizing Leave-In Conditioner"
        },
        {
          "id": "gid://shopify/Product/3632125280361",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Moisture RX Hawaiian Ginger Moisturizing Hair Butter"
        },
        {
          "id": "gid://shopify/Product/3632125313129",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Rosemary Mint Multivitamin Daily Styling Crème"
        },
        {
          "id": "gid://shopify/Product/3632125378665",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Rosemary Mint Strengthening Edge Gel"
        },
        {
          "id": "gid://shopify/Product/3632125476969",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Rosemary Mint Strengthening Shampoo"
        },
        {
          "id": "gid://shopify/Product/3632125509737",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Rosemary Mint Strengthening Hair Masque"
        },
        {
          "id": "gid://shopify/Product/3632125542505",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Rosemary Mint Scalp & Hair Strengthening Oil"
        },
        {
          "id": "gid://shopify/Product/3632125608041",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Moisturizing and Detangling Shampoo"
        },
        {
          "id": "gid://shopify/Product/3632125673577",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Curl Refreshing Spray"
        },
        {
          "id": "gid://shopify/Product/3632125706345",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Moisturizing and Detangling Conditioner"
        },
        {
          "id": "gid://shopify/Product/3632125771881",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Curl Smoothie"
        },
        {
          "id": "gid://shopify/Product/3632125804649",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Leave-In Conditioner"
        },
        {
          "id": "gid://shopify/Product/3632125935721",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Twisting Soufflé"
        },
        {
          "id": "gid://shopify/Product/3632125968489",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Coil Sculpting Custard"
        },
        {
          "id": "gid://shopify/Product/3632126034025",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Babassu Oil & Mint Deep Conditioner"
        },
        {
          "id": "gid://shopify/Product/3632126099561",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Honey & Ginger Styling Gel"
        },
        {
          "id": "gid://shopify/Product/3632126132329",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Mint Almond Oil"
        },
        {
          "id": "gid://shopify/Product/3632126230633",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Avocado Moisturizing Hair Milk"
        },
        {
          "id": "gid://shopify/Product/3632126263401",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "White Peony Leave-In Conditioner"
        },
        {
          "id": "gid://shopify/Product/3632126328937",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Babassu Conditioning Sulfate-Free Shampoo"
        },
        {
          "id": "gid://shopify/Product/3632126394473",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Detangling Co-Wash"
        },
        {
          "id": "gid://shopify/Product/3632126460009",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Honey & Ginger Edge Gel"
        },
        {
          "id": "gid://shopify/Product/3632126525545",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Brazilian Curly Cocktail Curl Cream"
        },
        {
          "id": "gid://shopify/Product/3632126558313",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Brazilian Curly Cocktail Curl Mousse"
        },
        {
          "id": "gid://shopify/Product/3632126623849",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Mongongo Oil Exfoliating Shampoo"
        },
        {
          "id": "gid://shopify/Product/3632126656617",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Mongongo Oil Protein-Free Hydrating Conditioner"
        },
        {
          "id": "gid://shopify/Product/3632126754921",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Mongongo Oil Pomade-to-Oil Treatment"
        },
        {
          "id": "gid://shopify/Product/3632126787689",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pre-Shampoo Treatment with Mongongo Oil"
        },
        {
          "id": "gid://shopify/Product/3632126820457",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Mongongo Oil Thermal & Heat Protectant Spray"
        },
        {
          "id": "gid://shopify/Product/3632126918761",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Mongongo Oil Style Setting Spray"
        },
        {
          "id": "gid://shopify/Product/3632126984297",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Sacha Inchi Curl Enhancing Cream"
        },
        {
          "id": "gid://shopify/Product/3632127017065",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Sacha Inchi Detangling Conditioner"
        },
        {
          "id": "gid://shopify/Product/3632127115369",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Sacha Inchi Cleansing Shampoo"
        },
        {
          "id": "gid://shopify/Product/3632127148137",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Length Check T-shirt"
        },
        {
          "id": "gid://shopify/Product/3632127180905",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Children's Hair & Health Vitamins"
        },
        {
          "id": "gid://shopify/Product/3632127279209",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Revitalizing Face Serum"
        },
        {
          "id": "gid://shopify/Product/3632127311977",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Hydrating Face Mask"
        },
        {
          "id": "gid://shopify/Product/3632127344745",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey 2-in-1 Face Scrub & Cleanser"
        },
        {
          "id": "gid://shopify/Product/3632127443049",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Stretch Mark Cream"
        },
        {
          "id": "gid://shopify/Product/3632127475817",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Radiant Body Wash"
        },
        {
          "id": "gid://shopify/Product/3632127541353",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Radiant Body Lotion"
        },
        {
          "id": "gid://shopify/Product/3632127639657",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Gummy Healthy Hair Adult Vitamins"
        },
        {
          "id": "gid://shopify/Product/3632127672425",
          "description": "This is a product description to help consumers learn about proucts. Many words describing more things about the product. Lots of product information. Often reduces understanding.",
          "name": "Pomegranate & Honey Illuminating Face Lotion w/SPF 15"
        }
      ]
    };

  

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(merchantobj);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    var merchantData = await fetch("https://wyv4u4u1ud.execute-api.us-west-1.amazonaws.com/dev/merchant", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        return result;
      })
      .catch(error => console.log("error", error));
    ctx.body = merchantData;
  });

  /*===  Save Customer form Data to cutomer profile metafields  ===*/
  // router.post("/proxy/saveCustomerData", async ctx => {
  //   console.log("ctx.req", ctx.req);
  //   console.log("save data", ctx.req);
  // });

  /*===  Send Email Request ===*/
  router.get("/proxy/api/emailsend", async (ctx, next) => {
      console.log("EMAIL SEND");
     

    var getCallData = ctx.request.body;
    var response = await getCallData;

    ctx.body = "response";
  });

  /*===  Complete Quiz - getProductScore Feature  ===*/
  router.get("/proxy/api", async (ctx, next) => {
    var getCallData = ctx.request.body;
    // console.log("body", ctx.request.body);

    var merchantId = "gid://shopify/Shop/KEYHERE";
    var platform = "Shopify";

    
    // console.log("ctx.session", ctx.session);
    // console.log("ctx.session 2", ctx);
    const { shop, accessToken } = ctx.session;
    // console.log("ctx. shop 2", shop);
    // console.log("ctx. accessToken 2", accessToken);
    var getCallData = ctx.request.body;
    // var x = await getMerchatInfo(ctx, accessToken, shop);


    // console.log("getMerchatInfo", x);

    // await getSubscriptionUrl(ctx, accessToken);

    // var platform = 'Shopify';
    // var merchantId = "gid://shopify/Shop/2050523245";

    var url = `https://wyv4u4u1ud.execute-api.us-west-1.amazonaws.com/dev/merchant?platform=${platform}&merchantId=${merchantId}`;

    // console.log("url", url);

    var requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    var merchantData = await fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        return result;
      })
      .catch(error => console.log("error", error));
    // console.log(typeof merchantData);

    var colorObj2 = {
      chatHeaderColor: merchantData.merchant.chatHeaderColor,
      buttonColor: merchantData.merchant.buttonColor,
      chatHeaderTextColor: merchantData.merchant.chatHeaderTextColor,
      buttonTextColor: merchantData.merchant.buttonTextColor
    };

    // console.log("colorObj2", colorObj2);
    ctx.body = colorObj2;
  });

  /*===  Complete Quiz - getProductScore Feature  ===*/
  router.get("/proxy/getscore", async (ctx, next) => {
    var getCallData = ctx.request.body;
    const user = ctx.request.query;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    console.log("user", user);

    var scoreRequestObj = {
      "product": {
          "name": user["product[name]"],
          "description": user["product[description]"],
          "id": user["product[id]"]
      },
      "user": {
          "coloring": "1",
          "styling": "2",
          "ingredients": user["user[ingredients][inputVal]"],
          "permed": user["user[permed][inputVal]"],
          "smoothing":user["user[smoothing][inputVal]"],
          "texture": user["user[texture][inputVal]"],
          "email": "<string>"
      },
      "merchant": {
          "id": "gid://shopify/Shop/2050523245",
          "platform": "Shopify"
      }
      
    };

    console.log("scoreRequestObj", scoreRequestObj);

    var raw = JSON.stringify(scoreRequestObj);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    var productScore = '';

    var scoreData = await fetch(
      "https://wyv4u4u1ud.execute-api.us-west-1.amazonaws.com/dev/calculate-score",
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log('result.score', result.score);
        productScore = result.score;
      
      })
      .catch(error => console.log("error", error));
    ctx.body = productScore;
  });

  /*===  Save Customer Answers - saveCustomerAnswers Feature  ===*/
  router.post("/proxy/api/customer", (ctx, next) => {
    // Set Variables
    var getCallData = ctx.request.body;
    var url = ``;
    var settings = {
      url: url,
      method: "POST",
      timeout: 0
    };

    // How can we make a GraphQL call here?

    //Make API Call
    new Promise((resolve, reject) => {
      $.ajax(settings)
        .done(function(response) {
          console.log(response);

          resolve();
        })
        .fail(function(value) {
          console.log("error", value);
          reject();
        })
        .always(function(value) {
          console.log("complete", value);
        });
    }).then(() => {
      // Send Customer Object
    });
  });

  router.get("*", verifyRequest(), async ctx => {
    // console.log('* req', ctx.req);

    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
