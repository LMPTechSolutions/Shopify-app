import { 
  ProgressBar,  Layout, ButtonGroup, Navigation, Heading, Avatar, TextStyle, TextContainer, Subheading,  Banner,
  Stack, Page, DisplayText, Card, Button, Thumbnail, Form, RadioButton, FormLayout, TextField, ResourceList, Caption
} from '@shopify/polaris';
import {AddMajorMonotone, OrdersMajorTwotone} from '@shopify/polaris-icons';
import ProductList from '../components/ProductList';
import React, { Fragment } from 'react';
import HomeIcon from "../assets/HomeIcon"; 
import AnaliticsIcon from "../assets/AnaliticsIcon"; 
import Editcolors from "../assets/Editcolors"; 
import HelpIcon from "../assets/HelpIcon"; 
import SettingsIcon from "../assets/SettingsIcon"; 
import '../styles/index.scss';
import $ from 'jquery';
 

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetMartketTextures: [],
      customerList:  {},
      merchantId: "",
      merchantPlatform: "",
      textureOptions: [
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon1.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon2.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon3.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: true
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon4.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon5.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon6.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon7.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon8.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon9.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon10.png?v=1578348832",
          srcAlt:"Black choker necklace",
          checked: false
        }
      ]
    };
    this.displayOpt = this.displayOpt.bind(this);
    this.hairPreformanceTypes =  this.hairPreformanceTypes.bind(this);
    this.submitSelection =  this.submitSelection.bind(this);
    this.customerTargetCheck =  this.customerTargetCheck.bind(this);

  
  }
  componentDidMount(){
    const merchantId = '1313';
    const merchantPlatform = '1313';

   console.log("merchantId", merchantId);
   console.log("merchantPlatform", merchantPlatform);
   const merchantURL = "/dev/merchant?platform=" + merchantPlatform + "&merchantId=" + merchantId;


   $.ajax({
     "async": true,
     "crossDomain": true,
     "headers": {
       "cache-control": "no-cache",
       "crossDomain": true,
       "access-control-allow-origin": "*"
     },
     type: "GET",
     url: merchantURL,
     success: function(data) {
       console.info("Success", data);      
     },
     error: function(e) {
       console.info("Error", e); 
     }
   }).then(function(data) {
     console.log("Data", data);
     if ( data == "No merchants found"){
       return;
     }else {
      var merchant_id = data.merchant.platformMerchantId.split("-")[0];
      console.log("merchant_id", merchant_id);
      console.log("data-", data);

      var obj = {
          "id": merchant_id,
          "platform": "Unlimited Plan",
          "productIngredients": "1",
          "productTexture": [
              "2",
              "7"
          ],
          "name": "<string>",
          "products": [
              {
                  "id": "<string>",
                  "name": "<string>",
                  "imageUrl": "<string>"
              },
              {
                  "id": "<string>",
                  "name": "<string>",
                  "imageUrl": "<string>"
              }
          ]
      };
      console.log("obj-", obj);
      this.setState({ customerList: data});
     }
   }.bind(this));
  }
  
  submitSelection(){
    //adjsut data   
    var cleanObj = this.state.customerList;
    cleanObj.merchant.id = this.state.customerList.merchant.platformMerchantId.split("-")[0];
    var data = JSON.stringify(this.state.customerList);


    console.log("data", data);


    // $.ajax({
    //   "async": true,
    //   "crossDomain": true,
    //   "headers": {
    //     "cache-control": "no-cache",
    //      "data": data,
    //      "crossDomain": true,
    //      "access-control-allow-origin": "*"
    //   },
    //   type: "POST",
    //   url: "/dev/merchant",
    //   data: data,
    //   success: function(data) {
    //     console.info("Success", data);
      
    //   },
    //   error: function(e) {
    //     console.info("Error", e); 
    //   }

    // }).then(function(data) {
    //   console.log("Data", data);
    // }.bind(this));   
  }
  hairPreformanceTypes(event){
    console.log("value", event.target.value);
    let nCheckbox = this.state.targetMartketTextures.slice(); // create a new copy of state value \
    console.log("value 2", nCheckboxå);

    if(this.isValueExist(nCheckbox, event)){ // check if the same value is preexisted in the array
        const index = nCheckbox.indexOf(event.target.value);
        nCheckbox.splice(index, 1); // removing the preexciting value 
    }else{
      var valueString = event.target.value;
      nCheckbox.push(valueString.toString()); // inserting the value of checkbox in the array
    }
    var newList = this.state.customerList;

    newList.merchant.productTexture = nCheckbox; 

    console.log("state chnage", newList);
    console.log("state w", newList.merchant.productTexture);

    this.setState({
      customerList: newList
    });
  }
  isValueExist(data, event){
    if(data.length == 0){
      return false;
    }
  
    for(let i = 0; i<= data.length; i++){
      if(event.target.value == data[i]){
        return true;
      }
    }
    return false;
  }
  displayOpt() {
    let merchant = this.state.customerList.merchant ? this.state.customerList.merchant :"";

    console.log("statssse", this.state.customerList.merchant);

    return this.state.textureOptions.map((option, index) => {
      
      var checked=false;
      var stackDiv = "";
      var stackDivClose = "";
      if(merchant === index){
        checked=true;
      } 
      

     if(index == 0 || index == 5){
        stackDiv = '<Stack alignment="center" distribution="center" spacing="extraTight" wrap={true}>'
        stackDivClose = "</Stack>";
      
     }
      
     return (
  
      <li key={index}>
        <input checked={option.checked} id={"markettexture" + index} name="targetMartketTextures" type="checkbox" value={index} onChange={this.hairPreformanceTypes}/>
        <label htmlFor="markettexture" >
          <Thumbnail  source={option.srcImg} alt={option.imgAlt} size="large" />
        </label> 
      </li>
   
  
      );
    });
    
  
  }

  customerTargetCheck(event) { 
    console.log(event.target.value);
    var newList = this.state.customerList;

    newList.merchant.productIngredients = event.target.value;

    console.log("state chnage", newList);
    console.log("state w", newList.merchant.productIngredients);

    this.setState({
      customerList: newList
    });
  }
  render() {
    console.log("state", this.state)
    return (
      <Page fullWidth>
        <Layout.Section>
          <Stack distribution="leading" spacing="loose" alignment="leading" vertical={false} wrap={false}>         
            <Stack vertical={true} distribution="fillEvenly" spacing="extraLoose" className='nav-section'>
              <div className="nav-logo">
                <Stack vertical={true} distribution="center" className='nav-logo' alignment="center">
                  <a href="/"><img src="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/emma-head.png?v=1578349281" alt=""/></a> 
                </Stack>
              </div>
              <Navigation location="/">
                <Navigation.Section items={[
                  {
                    url: '/',
                    label: 'DASHBOARD',
                    icon: HomeIcon,
                    selected: false
                  },
                  {
                    url: '/',
                    label: 'EMAIL ADDRESSES',
                    icon: OrdersMajorTwotone,
                    selected: false
                  },
                  {
                    url: '/',
                    label: 'ANALYTICS',
                    icon: AnaliticsIcon,
                    selected: false
                  },
                  {
                    url: '/edit-colors',
                    label: 'EDIT COLORS',
                    icon: Editcolors,
                    selected: false
                  },
                  {
                    url: '/help',
                    label: 'HELP',
                    icon: HelpIcon,
                    selected: false
                  },
                  {
                    url: '/billing',
                    label: 'BILLING',
                    icon: OrdersMajorTwotone,
                    selected: false
                  },
                  {
                    url: '/settings',
                    label: 'SETTINGS',
                    icon: SettingsIcon,
                    selected: true
                  }
                ]}/>
              </Navigation>
            </Stack>
            <Stack distribution="fillEvenly" spacing="tight" vertical={true}>
              <DisplayText size="Large">Settings</DisplayText>
              <hr/> 
              <Stack wrap={false}>                
                <Stack.Item >
                  <Heading>Digital Hair Care Expert Status</Heading>
                  <p>Manage the Digital Hair Care Expert display in <br/>your store.</p>
                </Stack.Item>
                <Stack.Item>
                  <Card >
                    <Stack distribution="center" alignment="center" spacing="extraLoose">
                      <div className="settings-toggle">
                        <Stack spacing="loose" distribution="fillEvenly">
                          <div>
                            <span>Show the Digital Hair Care Expert button <br/> on your hair product pages:</span>
                          </div>
                          <div>
                            <Stack alignment="center" distribution="center" spacing="tight">
                              <p>OFF</p>
                              <label className="switch">
                                <input type="checkbox" checked/>
                                <span className="slider round"></span>
                              </label>
                              <p>ON</p>
                            </Stack>                   
                          </div>
                        </Stack>
                      </div>
                    </Stack>
                  </Card>
                </Stack.Item>
              </Stack>    
              <Stack distribution="center"><DisplayText size="medium">Pricing Plans</DisplayText></Stack>                 
              <Card> 
                <Stack spacing="extraLoose" >
                  <Stack.Item>
                    <Stack spacing="extraLoose" vertical={true} alignment="center">
                      <Heading>CURRENT PLAN</Heading>
                      <TextStyle variation="strong">>Unlimited Plan</TextStyle>
                      <p>$0/month </p>
                      <p> + </p>
                      <p>10% commission on sales attributed </p>
                      <p>to the Digital Hair Care Expert* </p>
                      
                      <Caption>Includes:</Caption>
                      <ul>
                        <li>✔ Unlimited product match scores</li>
                        <li>✔ Customizable interface</li>
                        <li>✔ Email Address capture </li>
                      </ul>
                     </Stack> 
                  </Stack.Item>
                  <Stack.Item fill>
                    <Banner title="Emma Beauty Recommends" status="info" ></Banner>
                    <Stack spacing="extraLoose" vertical={true} alignment="center">
                      <TextStyle variation="strong">Pro Plan</TextStyle>
                      <p>$29/month</p> 
                      <p>+ </p>
                      <p>10% commission on sales attributed </p>
                      <p>to the Digital Hair Care Expert* </p>
                      
                      <Caption>Includes:</Caption>
                      <p>All Unlimited Plan Features</p>
                      <p>+</p> 
                      <p>★ Consumer Hair ID Report:</p>
                      <ul>
                        <li>✔ Visual summary of the info consumers share <br/>with the Digital Hair Care Expert about their hair</li>
                        <li>✔ Insights to help you attract consumers who will <br/>receive high scores for your products</li>
                        <li>✔ Delivered to your inbox monthly</li>
                      </ul>
                      <label>Coupon Code</label>
                      <input placeholder="Enter coupon code" />
                      <Button>Submit</Button>
                      <Button primary>Choose Plan</Button>
                      
                    </Stack>  
                  </Stack.Item>  
                </Stack>
              </Card>
              <Stack spacing="extraLoose" vertical={true} alignment="center">
                <p>*10% commission applies to orders placed by shoppers who received a product score from the Digital Hair Care <br/>Expert within the preceding 30 days.</p>
              </Stack>
              <hr/>
              <Stack wrap={false}>                
                <Stack.Item >
                  <Heading>Texture Type Selections</Heading>
                  <p>The textures on which your products perform <br/>best. </p>
                </Stack.Item>
                <Stack.Item>
                  <Card>
                  <ul className="step-1-options">
                 
                   <Stack alignment="center" distribution="center" spacing="extraTight" wrap={true}>
                   {/* {this.displayOpt()} */}
                    <li>
                      <input  id="markettexture" name="targetMartketTextures" type="checkbox" value="1" onChange={this.hairPreformanceTypes}/>
                      <label htmlFor="markettexture" >
                        <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon1.png?v=1578348832" alt="Black choker necklace" size="large" />
                      </label>                 
                    </li>
                    <li>
                      <input  id="markettexture1" name="targetMartketTextures" type="checkbox" value="2" onChange={this.hairPreformanceTypes}/>
                      <label htmlFor="markettexture1" >
                        <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon2.png?v=1578348832" alt="Black choker necklace" size="large" />
                      </label>
                    
                    </li>
                    <li>                  
                      <input  id="markettexture2" name="targetMarketTextures" type="checkbox" value="3" onChange={this.hairPreformanceTypes}/>
                      <label htmlFor="markettexture2" >
                        <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon3.png?v=1578348832" alt="Black choker necklace" size="large" />
                      </label>
                    
                    </li>
                    <li>                  
                      <input id="markettexture3" name="targetMarketTextures" type="checkbox" value="4" onChange={this.hairPreformanceTypes}/>
                      <label htmlFor="markettexture3" >
                        <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon4.png?v=1578348832" alt="Black choker necklace" size="large" />
                      </label>
                    
                    </li>
                    <li>                   
                      <input id="markettexture4" name="targetMarketTextures" type="checkbox" value="5" onChange={this.hairPreformanceTypes}/>
                      <label htmlFor="markettexture4" >
                        <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon5.png?v=1578348832" alt="Black choker necklace" size="large" /> 
                      </label>
                    
                    </li>
              </Stack>
              <Stack alignment="center" distribution="center" spacing="extraTight" wrap={true}>
                <li>                  
                  <input id="markettexture5" name="targetMarketTextures" type="checkbox" value="6" onChange={this.hairPreformanceTypes}/>
                  <label htmlFor="markettexture5" >
                    <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon6.png?v=1578348832" alt="Black choker necklace" size="large" />
                  </label>
                 
                </li>
                <li>                  
                  <input id="markettexture6" name="targetMarketTextures" type="checkbox" value="7" onChange={this.hairPreformanceTypes}/>
                  <label htmlFor="markettexture6" >
                    <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon7.png?v=1578348832" alt="Black choker necklace" size="large" />
                  </label>
                 
                </li>
                <li>                  
                  <input id="markettexture7" name="targetMarketTextures" type="checkbox" value="8" onChange={this.hairPreformanceTypes}/>
                  <label htmlFor="markettexture7" >
                    <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon8.png?v=1578348832" alt="Black choker necklace" size="large" />
                  </label>
                 
                </li>
                <li>                  
                  <input id="markettexture8" name="targetMarketTextures" type="checkbox" value="9" onChange={this.hairPreformanceTypes}/>
                  <label htmlFor="markettexture8" >
                    <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon9.png?v=1578348832" alt="Black choker necklace" size="large" />
                  </label>
                 
                </li>
                <li>                  
                  <input id="markettexture9" name="targetMarketTextures" type="checkbox" value="10" onChange={this.hairPreformanceTypes}/>
                  <label htmlFor="markettexture9" >
                    <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon10.png?v=1578348832" alt="Black choker necklace" size="large" />
                  </label>
                 
                </li>
              </Stack> 
            </ul>
 
                    <Stack distribution="center" alignment="center" spacing="extraLoose">
                      <Button onClick={this.submitSelection} primary>Save</Button>                       
                    </Stack>                    
                  </Card>
                </Stack.Item>
              </Stack> 
              <hr/>
              <Stack>                
                <Stack.Item>
                  <Heading>Ingredient Attitude</Heading>
                  <p>The term that best describes your target <br/>customer.</p>
                </Stack.Item>
                <Stack.Item>
                  <Card>
                    <ul className="step-2-options">     
                      <Stack spacing="loose" vertical={true} wrap={false}>                        
                          <li>
                            <input value="ingredientinvestigator" onChange={this.customerTargetCheck} id="ingredientinvestigator" name="customerTarget" type="radio"/>
                            <label htmlFor="ingredientinvestigator">
                              <Avatar source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step1-1.png?v=1578346790" alt="Black choker necklace" size="large" />
                              <Heading>Ingredient Investigator</Heading>
                              <p>I want high-performance products that are free of parabens and sulfates.</p>
                            </label>
                          </li>
                          <li>
                            <input value="performanceperfectionist" onChange={this.customerTargetCheck} id="performanceperfectionist" name="customerTarget"  type="radio"/>
                            <label htmlFor="performanceperfectionist">
                              <Avatar source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step1-2.png?v=1578346790" alt="Black choker necklace" size="large" />
                              <Heading>Performance Perfectionist</Heading>
                              <p>I don't care about ingredients, I just want my hair to look great.</p>
                            </label>
                          </li>   
                          <li> 
                            <input value="both" onChange={this.customerTargetCheck} id="both" name="customerTarget" type="radio"/>
                            <label htmlFor="both">
                              <p>My store targets both types of customers equal ly.</p>
                            </label>
                          </li>   
                      </Stack>                       
                    </ul>

                    <Stack distribution="center" alignment="center" spacing="extraLoose">
                      <Button onClick={this.submitSelection}  primary>Save</Button>
                    </Stack>                    
                  </Card>
                </Stack.Item>
              </Stack>              
            </Stack>
          </Stack>
        </Layout.Section>
      </Page>
    );
  }
}


export default Index;
