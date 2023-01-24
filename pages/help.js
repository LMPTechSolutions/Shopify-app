import { 
	Layout, Navigation, Heading, Subheading, DataTable, Stack, Page, DisplayText, Card, Button, 
} from '@shopify/polaris';
import {AddMajorMonotone, OrdersMajorTwotone} from '@shopify/polaris-icons';
import React, { Fragment } from 'react';
import Icon from "../assets/TelephoneIcon"; 
import HomeIcon from "../assets/HomeIcon"; 
import AnaliticsIcon from "../assets/AnaliticsIcon"; 
import Editcolors from "../assets/Editcolors"; 
import HelpIcon from "../assets/HelpIcon"; 
import SettingsIcon from "../assets/SettingsIcon"; 
import '../styles/index.scss';

import CollapsList from '../components/CollapsList';

const FAQS = [
  {"id": 1, "name": "What is a match score?", "price": 100, "details": "The Digital Hair Care Expert gives each product a score that predicts how well it will perform for the consumer. High match scores mean the consumer is likely to be happy with their purchase. A low score means there is a better product to fit their needs."},
  {"id": 2, "name": "What is a match score?", "price": 200, "details": "The Digital Hair Care Expert gives each product a score that predicts how well it will perform for the consumer. High match scores mean the consumer is likely to be happy with their purchase. A low score means there is a better product to fit their needs."},
  {"id": 3, "name": "What is a match score?", "price": 300, "details": "The Digital Hair Care Expert gives each product a score that predicts how well it will perform for the consumer. High match scores mean the consumer is likely to be happy with their purchase. A low score means there is a better product to fit their needs."}
];


const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Page fullWidth>  
        <Layout>
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
                      selected: true
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
                <Stack>
                  <Stack.Item><DisplayText size="Large">Help</DisplayText></Stack.Item>
                  <Stack.Item>
                    <Stack>
                      <Stack.Item ><Button primary>FAQ</Button></Stack.Item>
                      <Stack.Item><Button primary>Contact Support</Button></Stack.Item>
                    </Stack> 
                  </Stack.Item>
                </Stack>   
                <hr/> 
                <Card title="Frequently Asked Questions" sectioned>
                  {/* <DisplayText size="medium">Contact Support</DisplayText> */}
                  <CollapsList list={FAQS} />

                </Card>
                <Card title="Contact Support" sectioned>
                  {/* <DisplayText size="medium">Contact Support</DisplayText> */}
                  <Stack spacing="tight" distribution="center">
                    <p>We are dedicated to providing you with everything necessary to contribute to the success <br/>of your store. Please feel free to contact us:</p>
                  </Stack>                                         
                  <Stack spacing="tight" distribution="center" >
                    <Subheading>Phone:</Subheading>
                    <p>+1 (888) 517-6471</p>
                  </Stack>
                  <Stack spacing="tight" distribution="center">
                    <Subheading>Email:</Subheading>
                    <p>hello@emmabeauty.co</p>
                  </Stack>
                  <Stack spacing="tight" distribution="center">
                    <p>We respond to all messages within 24 hours.</p>
                  </Stack>                    
                </Card>
              </Stack>
            </Stack>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }


}

export default Help;
