import { 
  ProgressBar,  Layout, ButtonGroup, Navigation, Heading, Avatar, TextStyle, TextContainer, Subheading,  Banner,
  Stack, Page, DisplayText, Card, ColorPicker, Button, Thumbnail, Form, RadioButton, FormLayout, TextField, ResourceList, Caption
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
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_SHOP = gql`
  query {
    shop {
      id
      name
      url
    }
  }  
`;



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowColorSelector: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
      windowColor:" #152962",
      buttonColor: " #152962",
      windowTextColor: "",
      buttonTextColor: "",
      buttoncolorSelector: {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
      targetMartketTextures: [],
      customerList:  {
        merchant :{
          productTexture: [],
        }
      },
      merchantId: "",
      merchantPlatform: "Shopify",
      textureOptions: [
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon1.png?v=1578348832",
          srcAlt:"",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon2.png?v=1578348832",
          srcAlt:"",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon3.png?v=1578348832",
          srcAlt:"",
          checked: true
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon4.png?v=1578348832",
          srcAlt:"",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon5.png?v=1578348832",
          srcAlt:"",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon6.png?v=1578348832",
          srcAlt:"",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon7.png?v=1578348832",
          srcAlt:"",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon8.png?v=1578348832",
          srcAlt:"",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon9.png?v=1578348832",
          srcAlt:"",
          checked: false
        },
        {
          id:"markettexture",
          srcImg:"https://cdn.shopify.com/s/files/1/0252/4335/3193/files/step2-icon10.png?v=1578348832",
          srcAlt:"",
          checked: false
        }
      ],
      productIngredients: "",
      storeId: "",
      merchant: { 
        "id" : "1313", 
        "platform": "1313", 
        "productIngredients": "", 
      }
    };
    this.displayOpt = this.displayOpt.bind(this);
    this.hairPreformanceTypes =  this.hairPreformanceTypes.bind(this);
    this.submitSelection =  this.submitSelection.bind(this);
    this.customerTargetCheck =  this.customerTargetCheck.bind(this);
    this.getStoreData = this.getStoreData.bind(this);
    this.handleWindowChange = this.handleWindowChange.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleWindowTextColorChange = this.handleWindowTextColorChange.bind(this);
    this.handleButtonextColorChange = this.handleButtonextColorChange.bind(this);
  }
  handleWindowTextColorChange(){
    console.log("value", event.target.value);
    this.setState({ windowTextColor: event.target.value });
  }
  handleButtonextColorChange(){
    console.log("value", event.target.value);
    this.setState({ buttonTextColor: event.target.value });
  }
  handleWindowChange() {
    console.log("value", event.target.value);
    this.setState({ windowColor: event.target.value });
  }
  handleButtonChange() {
    console.log("value", event.target.value);
    this.setState({ buttonColor: event.target.value });
  }
  componentDidMount(){
    
  }
  getStoreData(){

    return (
      <Query query={GET_SHOP}>
        {({ data, loading, error }) => {
          if (loading) { return <div>Loading…</div>; }
          if (error) { return <div>{error.message}</div>; }  
          
          if  (data) {
            if (data.shop.id != this.state.storeId) {
              this.setState( { storeId: data.shop.id});
              console.log("state id", this.state.storeId);
              console.log("data.shop.id id", data.shop.id);
            }
            return <div></div>;
          }
        
        }}
      </Query>
    );

  }

  submitSelection(){ 
    //adjsut data   
    const { windowColor, buttonColor, windowTextColor, buttonTextColor } = this.state;
    const merchnatData = this.state.merchant;
    merchnatData.productTexture =  this.state.targetMartketTextures;
    merchnatData.id =  this.state.storeId;
    merchnatData.platform =  this.state.merchantPlatform;

    var merchantobj = {
      "id": "gid://shopify/Shop/252443353193",
      "platform": "Shopify",
      "productIngredients": "1",
      "productTexture": [
          "2",
          "7"
      ],      
      "chatHeaderColor": windowColor,
      "buttonColor": buttonColor,
      "chatHeaderTextColor": windowTextColor,
      "buttonTextColor": buttonTextColor,
      "name": "<string>",
      "products": [
        {
          "name": "Product Sample 2",
          "description": "none",
          "id": "4439858643053"
        },
        {
            "name": "Product Sample",
            "description": "none",
            "id": "4021716648045"
        }
      ]
    };
    console.log(typeof merchantobj);

    var merchantobjString = JSON.stringify(merchantobj);

    // var queryString = Object.keys(merchantobj).map(key => key + '=' + merchantobj[key]).join('&');
    // var queryStringUrl = "";
    // console.log("queryString", queryString);

   

    // const merchantURL = "/dev/merchant?platform=" + merchantPlatform + "&merchantId=" + merchantId;
    // url: "https://wyv4u4u1ud.execute-api.us-west-1.amazonaws.com/dev/merchant",

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: merchantobjString,
    };

    var productScore = '';

    var scoreData = fetch(
      "/proxy/editColors",
      requestOptions
    )
      .then(response => response.json())
      .then(result => console.log('result.score', result))
      .catch(error => console.log("error", error));

    // $.ajax({
    //   "async": true,
    //   "crossDomain": true,
    //   "headers": {
    //     "cache-control": "no-cache",
    //      "crossDomain": true,
    //      "access-control-allow-origin": "*"
    //   },
    //   type: "POST",
    //   url: "/proxy/editColors",
    //   data: merchantobjString,
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
    console.log("value 2", nCheckbox);

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
    var productIngred = event.target.value;
    this.setState({
      productIngredients : productIngred
    });


    // console.log("state", this.state);
  }
  render() {
    const { windowColor, buttonColor, windowTextColor, buttonTextColor } = this.state;

    const chat = {
      header : {
        backgroundColor: windowColor,
        color: windowTextColor
      },
      button : {
        backgroundColor: buttonColor,
        color: buttonTextColor
      }
    };
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
              <DisplayText size="Large">Edit Colors</DisplayText>
              <hr/> 
             
                <Stack  alignment="center" vertical={true}> 
                  <header  element="h1"><DisplayText size="medium">Customize your Digital Hair Care Expert below:</DisplayText></header>
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
                          <input value="blue" id="windowColor1" name="windowColor" onChange={this.handleWindowChange} type="radio"/>
                          <label htmlFor="windowColor1" className="option-blue ">
                          </label>
                        </li>
                        <li>                 
                          <input value="red" id="windowColor2" name="windowColor"  onChange={this.handleWindowChange} type="radio"/>
                          <label htmlFor="windowColor2" className="option-red ">
                          </label>
                        </li>
                        <li>                 
                          <input value="vanilla" id="windowColor3" name="windowColor"  onChange={this.handleWindowChange} type="radio"/>
                          <label htmlFor="windowColor3" className="option-vanilla ">
                          </label>
                        </li>
                        <li>                 
                          <input value="pink" id="windowColor4" name="windowColor"  onChange={this.handleWindowChange} type="radio"/>
                          <label htmlFor="windowColor4" className="option-pink ">
                          </label>
                        </li>
                        <li>                 
                          <input value="white" id="windowColor5" name="windowColor"  onChange={this.handleWindowChange} type="radio"/>
                          <label htmlFor="windowColor5" className="option-white ">
                          </label>
                        </li>
                        <li>                 
                          <input value="custom" id="windowColor6" name="windowColor"  onChange={this.handleWindowChange} type="radio"/>
                          <label htmlFor="windowColor6" className=" ">
                          </label>
                        </li>
                        <ColorPicker onChange="" color={this.state.windowColorSelector} />
                      </Stack>
                    </ul>
                    <TextStyle variation="strong">Pick button color</TextStyle>
                    <p>The colors below are used on your website:</p>
                    <ul>
                      <Stack spacing="extraTight" distribution="leading">
                        <li>
                         
                           <input  value="blue" id="buttonColor1" name="buttonColor" onChange={this.handleButtonChange} type="radio"/>
                           <label htmlFor="buttonColor1" className="option-blue "></label>
                        </li>
                        <li className="option-active">
                           <input value="blue" id="buttonColor2" name="buttonColor" onChange={this.handleButtonChange} type="radio"/> 
                           <label htmlFor="buttonColor2" className="option-blue "></label>
                        </li>
                        <li> 
                          <input value="red" id="buttonColor3" name="buttonColor" onChange={this.handleButtonChange} type="radio"/> 
                          <label htmlFor="buttonColor3" className="option-red "></label>
                        </li>
                        <li> 
                          <input  value="vanilla" id="buttonColor4" name="buttonColor" onChange={this.handleButtonChange} type="radio"/> 
                          <label htmlFor="buttonColor4" className="option-vanilla "> </label>
                          </li>
                        <li> 
                          <input  value="pink" id="buttonColor5" name="buttonColor" onChange={this.handleButtonChange} type="radio"/> 
                          <label htmlFor="buttonColor5" className="option-pink "> </label>
                        
                        </li>
                        <li> 
                          <div className="option-white"> </div>
                          <input type="radio"/> 
                        </li>
                        <ColorPicker onChange={this.handleColorChange}  color={this.state.buttoncolorSelector} />
                      </Stack>
                    </ul>
                    <TextStyle variation="strong">Pick chat window text color</TextStyle>
                    <ul>
                      <Stack spacing="extraTight" distribution="leading">
                        <li> 
                          <input value="white" id="windowTxtColor1" name="windowTxtColor2" onChange={this.handleWindowTextColorChange} type="radio"/> 
                           <label htmlFor="windowTxtColor1" className="option-white  "></label>
                        </li>
                        <li className="option-active">
                           {/* <div className="option-black"> </div> */}
                              {/* <input type="radio"/>  */}
                           <input value="black" id="windowTxtColor2" name="windowTxtColor2" onChange={this.handleWindowTextColorChange}  type="radio"/> 
                           <label htmlFor="windowTxtColor2" className="option-black"></label>
                        </li>
                      </Stack>                
                    </ul>
                    <TextStyle variation="strong"> Pick button text color</TextStyle>
                    <ul>
                      <Stack spacing="extraTight" distribution="leading">
                        <li> 
                            <input value="white" id="buttonTxtColor1" name="buttonTxtColor" onChange={this.handleButtonextColorChange} type="radio"/> 
                            <label htmlFor="buttonTxtColor1" className="option-white  "></label>
                        </li>
                        <li className="option-active">
                            {/* <div className="option-black"> </div> */}
                            {/* <input type="radio"/>  */}
                            <input value="black" id="buttonTxtColor2" name="buttonTxtColor" onChange={this.handleButtonextColorChange}  type="radio"/> 
                            <label htmlFor="buttonTxtColor2" className="option-black"></label>
                        </li>
{/*                        
                        <li className="option-active"> 
                          <div className="option-white"> </div>
                          <input type="radio"/>
                         </li>
                        <li> 
                          <div className="option-black"> </div>
                          <input type="radio"/> 
                        </li> */}
                      </Stack>                
                    </ul>
                    <Button primary={true} onClick={this.submitSelection}>Save</Button>
                  </div>
                  <div  className="step-3-demo">
                    <TextStyle variation="subdued">Chat Window</TextStyle>
                    <div className="demo-window">
                      <div className="demo-header" style={chat.header} >Digital Hair Care Expert</div>
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
                        <div className="demo-btn-large-demo-button"  style={chat.button}>� WILL THIS WORK FOR YOU?</div>
                      </Stack>
                    </div>
                  </div>
                </Stack>           
            </Stack>
          </Stack>
        </Layout.Section>
        {this.getStoreData()}
      </Page>
    );
  }
}


export default Index;
