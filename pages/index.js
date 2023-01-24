import { 
  ProgressBar,  Layout, ButtonGroup, Navigation, Heading, Avatar, TextStyle, TextContainer, Subheading,
  Stack, Page, DisplayText, Card, ColorPicker, Button, Thumbnail, Form, RadioButton, FormLayout, TextField, ResourceList, Caption
} from '@shopify/polaris';
import {AddMajorMonotone, OrdersMajorTwotone } from '@shopify/polaris-icons';
import ProductList from '../components/ProductList';

import React, { Fragment } from 'react';
import Icon from "../assets/TelephoneIcon"; 
import HomeIcon from "../assets/HomeIcon"; 
import AnaliticsIcon from "../assets/AnaliticsIcon"; 
import Editcolors from "../assets/Editcolors"; 
import HelpIcon from "../assets/HelpIcon"; 
import SettingsIcon from "../assets/SettingsIcon"; 
import ProgressBar1 from "../assets/ProgressBar1"; 
import ProgressBar2 from "../assets/ProgressBar2"; 
import ProgressBar3 from "../assets/ProgressBar3"; 
import ProgressBar4 from "../assets/ProgressBar4"; 
import ProgressBar5 from "../assets/ProgressBar5"; 
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import $ from 'jquery';

 
import '../styles/index.scss';


// import ResourceListWithCustomers from '../components/CustomerList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, 
      onBaording: false,
      customerOpen: false,
      targetMartketTextures: [],
      step: 1,
      formOptions:  {
        targetCustomer: [{name: "", value: ""}]
      },
      customSetup: false,
      data : [
        {
          name: 'Page A', uv: 4000,  amt: 2400,
        },
        {
          name: 'Page B', uv: 3000,  amt: 2210,
        },
        {
          name: 'Page C', uv: 2000,  amt: 2290,
        },
        {
          name: 'Page D', uv: 2780,  amt: 2000,
        },
        {
          name: 'Page E', uv: 1890,  amt: 2181,
        },
        {
          name: 'Page F', uv: 2390,  amt: 2500,
        },
        {
          name: 'Page G', uv: 3490,  amt: 2100,
        },
      ],
      customerTargetNext: true,
      customerTarget: "",
      windowColor: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
      buttoncolor: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
      customerReferal: false,
      merchantValue: 'gid://shopify/Shop/252443353193',
    };
    this.customerTargetCheck =  this.customerTargetCheck.bind(this);
    this.customerTargetNextBtn =  this.customerTargetNextBtn.bind(this);
    this.customerSubmit =  this.customerSubmit.bind(this);
    this.customerReferalSubmit =  this.customerReferalSubmit.bind(this);
    this.hairPreformanceTypes =  this.hairPreformanceTypes.bind(this);
    this.isValueExist =  this.isValueExist.bind(this);
    this.formSubmit =  this.formSubmit.bind(this);
    this.getMerchantData =  this.getMerchantData.bind(this);
    this.handleMerchantChange = this.handleMerchantChange.bind(this);
    
  }
  componentDidMount(){
    const merchantId = 'gid://shopify/Shop/252443353193';
    const merchantPlatform = 'Shopify';
   

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
      this.setState({ customerList: data, onBaording: false });
     }
   }.bind(this));
  }
  formSubmit(){
    console.log("working");

    const storeData = {
      "id": this.state.merchantValue,
      "platform": "Shopify",
      "productIngredients": "<number>",
      "productTexture": [
          "<number>",
          "<number>"
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

    var data = JSON.stringify(storeData);
    console.info("storeData", data);

    $.ajax({
      "async": true,
      "crossDomain": true,
      "headers": {
        "cache-control": "no-cache",
         "data": data,
         "crossDomain": true,
         "access-control-allow-origin": "*"
      },
      type: "POST",
      url: "/dev/merchant",
      data: data,
      success: function(data) {
        console.info("Success", data);
      
      },
      error: function(e) {
        console.info("Error", e); 
      }

    }).then(function(data) {
      console.log("Data", data);
    // this.setState({ customerList: results});
    }.bind(this));



  }
  handleMerchantChange(){
    this.setState({merchantValue: event.target.value});
  }
  
  getMerchantData(event){
    event.preventDefault();
    const merchantId = this.state.merchantValue;
    const merchantURL = "/dev/merchant?platform=Shopify&merchantId=" + merchantId;

    console.log("merchantId", merchantId);
    console.log("merchantURL", merchantURL);

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
    // this.setState({ customerList: results});
    }.bind(this));

  }
  
  showFormStep(){ 
    if (this.state.step >= 8 ){
      //this.setState({ step: 1}); 
      this.setState({ onBaording: false});  
    }

    switch(this.state.step) {
      case 1:
        return (
          <Fragment>
            <Stack  alignment="center" vertical={true}>             
              <header element="h1"><DisplayText size="medium">Meet your Digital Hair Care Expert!</DisplayText> </header>
              <p> Give every consumer who visits your store a personalized shopping <br/>experience. The Digital Hair Care Expert will allow you to:</p>
              <ul className="step-0-options">
                <li>
                  <img src="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/capture-payment.png?v=1578346259" alt=""/> 
                  <p>Guide shoppers to the best products for their needs and help <br/>them avoid products that will leave them disappointed</p>
                </li>
                <li>
                  <img src="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/report.png?v=1578346259" alt=""/> 
                  <p>Track consumer interactions with the Digital Hair Care Expert <br/>and see what they purchase</p>
                </li>
                <li>
                  <img src="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/invite.png?v=1578346259" alt=""/> 
                  <p>Collect email addresses from consumers who are interested in your products</p>
                </li>
              </ul>


            
            </Stack>
            <Stack alignment="center" vertical={true} >
              <div className="step-0-bottom">
                <p>Before you get started, we need to know a bit more about your store. <br/>This 5-step process should take you 3 minutes to complete.</p>    
                <Button primary={true} onClick={() => this.setState({ step: (this.state.step + 1) })}>Get Started</Button>
                {/* <Button primary={true} onClick={this.formSubmit}>Get Started</Button>                  */}
              </div>
            </Stack>
                        
              {/* <input type="text" placeholder="tester MErcahnt ID" value={this.state.merchantValue} onChange={this.handleMerchantChange} />      
            
            <Button primary={true} onClick={this.getMerchantData}>Test Merchant ID</Button>                  */}

          </Fragment>
        );
        break;
      case 2:
        return (
          <Fragment>
            <Stack  alignment="center" vertical={true}>              
              <ProgressBar1  fill="#fff" className="telephone" style={{  padding: "6px", margin_bottom: "20px", margin_top: "-20px" }} />
              <header element="h1"> 
                <DisplayText size="medium">
                   Which term best describes your target customer?
                </DisplayText> 
              </header>
              <TextStyle variation="subdued">(Select one)</TextStyle> 
            </Stack>
            <ul className="step-2-options">     
              <Stack spacing="loose" vertical={true} wrap={false}> 
                <Stack spacing="loose" vertical={false} wrap={false} distribution="center">              
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
                </Stack>
                <Stack spacing="loose" vertical={false} wrap={false} distribution="center">        
                  <li> 
                    <input value="both" onChange={this.customerTargetCheck} id="both" name="customerTarget" type="radio"/>
                    <label htmlFor="both">
                      <p>My store targets both types of customers equal ly.</p>
                    </label>
                  </li>   
                </Stack>        
              </Stack>                       
            </ul>
            <Stack  alignment="center" vertical={true}>
              <Button disabled={this.state.customerTargetNext} primary={true} onClick={this.customerTargetNextBtn}>Next</Button>  
            </Stack> 
          </Fragment>
        );
        break;
        case 3:
          return (
            <Fragment>
              
              <Stack  alignment="center" vertical={true}> 

                <header element="h1"><DisplayText size="medium">Custom setup required.</DisplayText></header>
                <TextStyle>This step is optional. You can change these colors at any time.</TextStyle> 
                <TextStyle>You’ve indicated that your store equally targets customers who are ingredient concious and customers who are not. This requires custom setup that we will work with you to complete. Please contact us by submitting a request below.</TextStyle> 
                <TextStyle>If the majority of your products target one type of customer, please go back to change your selection</TextStyle> 
              </Stack>  
              <Stack  alignment="center" vertical={true}>
                <TextStyle variation="subdued">Almost done!</TextStyle>
                <Button primary={true} onClick={() => this.setState({ step: (this.state.step - 1) })}>Go Back</Button>   
               

                { this.state.customerReferal 
                  ?  <TextStyle>Code received. Thank you!</TextStyle> 
                  :  <Button onClick={this.customerSubmit} primary={true} >Submit Request</Button>
                
                }
                
              </Stack>                    
            </Fragment> 
          );
          break;
        case 4:
        return (
          <Fragment>
            <Stack  alignment="center" vertical={true}> 
              <ProgressBar2 fill="#fff" className="telephone" style={{  padding: "6px", margin_bottom: "20px", margin_top: "-20px" }} />
              <header element="h2"><DisplayText size="small">Which texture types do your products perform best?</DisplayText> </header>
              <TextStyle variation="subdued">(Select all that apply)</TextStyle> 
              <TextStyle variation="subdued">Choose the textures that best represent your target market.</TextStyle> 
            </Stack>
            <ul className="step-1-options">
              <Stack alignment="center" distribution="center" spacing="extraTight" wrap={true}>
                <li>
                  <input id="markettexture" name="targetMartketTextures" type="checkbox" value="1" onChange={this.hairPreformanceTypes}/>
                  <label htmlFor="markettexture" >
                    <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon1.png?v=1578348832" alt="Black choker necklace" size="large" />
                  </label>                 
                </li>
                <li>
                  <input id="markettexture1" name="targetMartketTextures" type="checkbox" value="2" onChange={this.hairPreformanceTypes}/>
                   <label htmlFor="markettexture1" >
                    <Thumbnail source="https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon2.png?v=1578348832" alt="Black choker necklace" size="large" />
                  </label>
                 
                </li>
                <li>                  
                  <input id="markettexture2" name="targetMarketTextures" type="checkbox" value="3" onChange={this.hairPreformanceTypes}/>
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
            <Stack  alignment="center" vertical={true}>
              <Button primary={true}   disabled={this.state.targetMartketTextures.length >= 1 ? "" : "disabled"} onClick={() => this.setState({ step: (this.state.step + 1) })}>Next</Button>  
            </Stack> 
          </Fragment>
        );
        break;
      case 5:
        return (
          <Fragment>
            <Stack  alignment="center" vertical={true}> 
              <ProgressBar3 fill="#fff" className="telephone" style={{  padding: "6px", margin_bottom: "20px", margin_top: "-20px" }} />
              <header element="h1"><DisplayText size="medium">Customize your Digital Hair Care Expert below:</DisplayText></header>
              <TextStyle>This step is optional. You can change these colors at any time.</TextStyle> 
            </Stack>  
            <Stack distribution="equalSpacing">
              <div className="step-3-options">
                <TextStyle variation="strong">Pick window color</TextStyle>
                <p>The colors below are used on your website:</p>
                <ul className="step-3-options">
                  <Stack spacing="extraTight" distribution="leading">
                    {/* <li className="option-active"> <div className="option-purple"> </div><input type="radio"/> </li>
                    <li> <div className="option-blue"> </div><input type="radio"/> </li>
                    <li> <div className="option-red"> </div><input type="radio"/> </li>
                    <li> <div className="option-vanilla"> </div><input type="radio"/> </li>
                    <li> <div className="option-pink"> </div><input type="radio"/> </li>
                    <li> <div className="option-white"> </div><input type="radio"/> </li> */}
                    <li>                 
                      <input value="blue" id="windowColor1" name="windowColor"  type="radio"/>
                      <label htmlFor="windowColor1" className="option-blue ">
                      </label>
                    </li>
                    <li>                 
                      <input value="red" id="windowColor2" name="windowColor"  type="radio"/>
                      <label htmlFor="windowColor2" className="option-red ">
                      </label>
                    </li>
                    <li>                 
                      <input value="vanilla" id="windowColor3" name="windowColor"  type="radio"/>
                      <label htmlFor="windowColor3" className="option-vanilla ">
                      </label>
                    </li>
                    <li>                 
                      <input value="pink" id="windowColor4" name="windowColor"  type="radio"/>
                      <label htmlFor="windowColor4" className="option-pink ">
                      </label>
                    </li>
                    <li>                 
                      <input value="white" id="windowColor5" name="windowColor"  type="radio"/>
                      <label htmlFor="windowColor5" className="option-white ">
                      </label>
                    </li>
                    <li>                 
                      <input value="custom" id="windowColor6" name="windowColor"  type="radio"/>
                      <label htmlFor="windowColor6" className=" ">
                      </label>
                    </li>
                    <ColorPicker onChange="" color={this.state.windowColor} />
                  </Stack>
                </ul>
                <TextStyle variation="strong">Pick button color</TextStyle>
                <p>The colors below are used on your website:</p>
                <ul>
                  <Stack spacing="extraTight" distribution="leading">
                    <li> <div className="option-purple"> </div><input type="radio"/> </li>
                    <li className="option-active"> <div className="option-blue"> </div><input type="radio"/> </li>
                    <li> <div className="option-red"> </div><input type="radio"/> </li>
                    <li> <div className="option-vanilla"> </div><input type="radio"/> </li>
                    <li> <div className="option-pink"> </div><input type="radio"/> </li>
                    <li> <div className="option-white"> </div><input type="radio"/> </li>
                    <ColorPicker onChange={this.handleColorChange}  color={this.state.buttoncolor} />
                  </Stack>
                </ul>
                <TextStyle variation="strong">Pick chat window text color</TextStyle>
                <ul>
                  <Stack spacing="extraTight" distribution="leading">
                    <li> <div className="option-white"> </div><input type="radio"/> </li>
                    <li className="option-active"> <div className="option-black"> </div><input type="radio"/> </li>
                  </Stack>                
                </ul>
                <TextStyle variation="strong"> Pick button text color</TextStyle>
                <ul>
                  <Stack spacing="extraTight" distribution="leading">
                    <li className="option-active"> <div className="option-white"> </div><input type="radio"/> </li>
                    <li> <div className="option-black"> </div><input type="radio"/> </li>
                  </Stack>                
                </ul>
              </div>
              <div  className="step-3-demo">
                <TextStyle variation="subdued">Chat Window</TextStyle>
                <div className="demo-window">
                  <div className="demo-header">Digital Hair Care Expert</div>
                  <ul>
                    <li className="chat-left-small">Gorgeous!</li>
                    <li className="chat-left-big">Have you had any chemical treatments in the past 2 years?</li>
                    <li className="chat-right">Color</li>
                    <li className="chat-left-small">Lovely!</li>
                    <li className="chat-left-big">Last question: how do you feel about product ingredients?</li>
                  </ul>
                  <div>
                    <Stack alignment="center" distribution="center">
                      <div className="demo-btn-small">Performance Perfectionist</div>
                      <div className="demo-btn-small">Ingredient Investigator</div>
                    </Stack>
                  </div>                  
                </div>
                <div className="demo-bottom">
                  <Stack alignment="center" distribution="center" vertical={true}>
                    <p>Product Page Button</p>
                    <div className="demo-btn-large"><img src="" alt=""/>� WILL THIS WORK FOR YOU?</div>
                  </Stack>
                </div>
              </div>
            </Stack>
            <Stack  alignment="center" vertical={true}>
              <TextStyle variation="subdued">Almost done!</TextStyle>
              <Button primary={true} onClick={() => this.setState({ step: (this.state.step + 1) })}>Next</Button>   
            </Stack>                    
          </Fragment>
        );
        break;
      case 6:
        return (
          <Fragment>
            <Stack  alignment="center" vertical={true}>
              <ProgressBar4 fill="#fff" className="telephone" style={{  padding: "6px", margin_bottom: "20px", margin_top: "-20px" }} />


              <header element="h1"><DisplayText size="medium">Did anyone refer you to us?</DisplayText> </header>


              <TextStyle variation="subdued">Let us know! Please enter their referral code below. Otherwise, go to the next step</TextStyle>
              <div className='referral-input'>
                <Stack  alignment="center" vertical={true}>

                  { this.state.customerReferal 
                  ?  <TextStyle>Thank you for submitting your request! It has been sent and we will contact you shortly.</TextStyle> 
                  : (
                    <Stack  alignment="center" vertical={true}>
                        <label>Referral Code</label>
                        <input placeholder="CODE"/>
                        <Button onClick={this.customerReferalSubmit} primary={true}>Submit</Button>
                        </Stack>
                    )
                
                  }
                </Stack>
              </div>      
              <p className='referral-text'>Code received. Thank you!</p>   
              <Button primary={true} onClick={() => this.setState({ step: (this.state.step + 1) })}>Next</Button>   
            </Stack>
          </Fragment>
        );
        break;
      case 7:
        return (
          <Fragment>
            <Stack  alignment="center" vertical={true}>
              <ProgressBar5 fill="#fff" className="telephone" style={{  padding: "6px", margin_bottom: "20px", margin_top: "-20px" }} />
              <header element="h1"><DisplayText size="medium">Ready?</DisplayText> </header>
            </Stack>
            <div className="step-5-options">
              <Stack spacing="loose" distribution="fillEvenly">
                <div>
                  <span>Show the Digital Hair Care Expert button <br/> on your hair product pages:</span>
                </div>
                <div>
                <Stack alignment="center" distribution="center" spacing="tight" vertical={true}>  
                  <h4>Press to activate</h4>
                  <Stack alignment="center" distribution="center" spacing="tight">
                    <p>OFF</p>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                    <p>ON</p>
                  </Stack>
                </Stack>                   
                </div>
              </Stack>
            </div>
            <Stack  alignment="center" vertical={true}>
              <Button primary={true} onClick={() => this.setState({ step: (this.state.step + 1) })}>Finished</Button>  
            </Stack> 
          </Fragment>

        );
        break;
      default:
        return (
          <div> 
            <h2>Meet your Digital Hair Care Expert!</h2>
            <p> Give every consumer who visits your store a personalized shopping <br/>experience. The Digital Hair Care Expert will allow you to:</p>
            <ul>
              <li>
                <img src="" alt=""/> 
                <p>Guide shoppers to the best products for their needs and help <br/>them avoid products that will leave them disappointed</p>
              </li>
              <li>
                <img src="" alt=""/> 
                <p>Track consumer interactions with the Digital Hair Care Expert <br/>and see what they purchase</p>
              </li>
              <li>
                <img src="" alt=""/> 
                <p>Collect email addresses from consumers who are interested in your products</p>
              </li>
            </ul>
            <div>
              <p>Before you get started, we need to know a bit more about your store. <br/>This 5-step process should take you 3 minutes to complete.</p>
              <button>Get Started</button>
            </div>
          </div>
        );
        break;
    }
  }

  render() {
    let view;
    if (this.state.onBaording) {
      view =
      <Layout.Section>
        <Form onSubmit={this.handleSubmit} >
          <FormLayout> {this.showFormStep()}</FormLayout>
        </Form>        
      </Layout.Section>;
    } else {
      view =          
      <Layout.Section>
        <Stack distribution="leading" spacing="loose" alignment="leading" wrap={false}>         
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
                  selected: true
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
                  selected: false
                }
              ]}/>
            </Navigation>
          </Stack>
          <Stack distribution="fillEvenly" spacing="tight" vertical={true}>
            <DisplayText size="Large">Dashboard</DisplayText>
            <hr/> 
            <Card title="Digital Hair Care Expert Sales" sectioned>
              <p> Summary of sales facilitated by your Digital Hair Care Expert  </p>  
              <span className="corder-date"><DisplayText size="medium">Oct 2019</DisplayText></span> 
              <Stack distribution="fillEvenly" >
                <Stack distribution="fillEvenly" spacing="tight" vertical={true}>
                  <Subheading>sales facilitated in the last 30 days</Subheading>  
                  <Stack>
                    <Stack.Item fill><DisplayText size="medium">$1,200.00 </DisplayText></Stack.Item>
                    <Stack.Item><DisplayText size="medium">x 10%</DisplayText></Stack.Item>
                  </Stack>                
                </Stack>
                <Stack distribution="fillEvenly" spacing="tight" vertical={true}> 
                  <Subheading>This month’s Emma Beauty commission</Subheading>
                  <DisplayText size="medium">$120.00 </DisplayText>
                </Stack>  
              </Stack>             
              <hr/>
              <Stack>
                <Stack.Item fill>Next Payment to Emma Beauty Due</Stack.Item>
                <Stack.Item>November 1, 2019</Stack.Item>
              </Stack>  
              <hr/>
              <Stack spacing="tight" distribution="center">
                <Button plain url="/billing">See More</Button>
              </Stack>
            </Card>
            <Card title="" sectioned>
              <Stack distribution="fillEvenly" spacing="tight">                
                <Stack.Item fill><Heading>Total Clicks</Heading></Stack.Item>
                <Stack.Item>
                  <ButtonGroup segmented>
                    <Button size="slim">Today</Button>
                    <Button size="slim">This Week</Button>
                    <Button size="slim">This Month</Button>
                    <Button size="slim">This Year</Button>
                  </ButtonGroup>  
                </Stack.Item>
              </Stack>       
             
              <div>
                Graph
                <BarChart
                  width={500}
                  height={300}
                  data={this.state.data}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </div>
              <Stack spacing="tight" distribution="center">
                <Button primary>Export</Button>
              </Stack>
              
            </Card>
            <Card title="Consumer Engagements"  sectioned >
              <Stack>                
                <Stack.Item fill >
                  <p>Understand the path to purchase as consumers <br/> engage with the Digital Hair Care Expert.</p>
                </Stack.Item>
                <Stack.Item>
                  <Subheading>Consumers Engaged</Subheading>
                  <DisplayText size="medium">90</DisplayText>
                </Stack.Item>
              </Stack>       
              <Stack spacing="tight" distribution="center">
                <Button plain>See More</Button>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </Layout.Section>;
    }
    return (
      <Page fullWidth>  
        <Layout>
           <div className="boarding-modal">{view}</div> 
          
        </Layout>
      </Page>
    );
  }


  

 
  hairPreformanceTypes(event){
    let nCheckbox = this.state.targetMartketTextures.slice(); // create a new copy of state value 
    if(this.isValueExist(nCheckbox, event)){ // check if the same value is preexisted in the array
        const index = nCheckbox.indexOf(event.target.value);
        nCheckbox.splice(index, 1); // removing the preexciting value 
    }else{
      nCheckbox.push(event.target.value); // inserting the value of checkbox in the array
    }
    this.setState({
      targetMartketTextures: nCheckbox
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
  customerReferalSubmit(){
    console.log("working customerSubmit")
    this.setState({ customerReferal: true});
  }
  customerSubmit(){
    console.log("working customerSubmit")
    this.setState({ customSetup: true});
  }
  customerTargetNextBtn(){
    const {customerTarget, step} = this.state;
    console.log("state step", step);
    console.log("customerTarget", customerTarget);
     //  customerTarget === "both" ? this.setState({ step: (this.state.step + 1) }) : this.setState({ step: (this.state.step + 2 )});
    var nextStep;
    if( customerTarget != "both" ){ 
      nextStep = step + 2;
      } else{ 
      nextStep = step + 1;
    }
    console.log("step", nextStep);
    this.setState({ step: nextStep});
  }
  handleColorChange(color) {
    this.setState({ color });
  }
  customerTargetCheck(event) { 
    console.log(event.target.value);
    this.setState({ customerTargetNext: false, customerTarget: event.target.value}); 
  }
  showStep = () => {    
    console.log("currentStep");
    let currentStep = this.state.step++;
    console.log(currentStep);
    this.setState({ step: currentStep });
  };
}

export default Index;
