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

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.DataTableExample = this.DataTableExample.bind(this);
  }

  DataTableExample() {
    const rows = [
      ['Oct 2019', '$1,200.00', '$0', 'Due  Nov 1'],
      ['Sept 2019', '$1,300.00', '$0', '$130.00'],
      ['Aug 2019', '$1,500.00', '$0', '$150.00'],
      ['Jul 2019', '$1,545.45', '$0', '$154.55'],
    ];
  
    return (
      <Page>
        <Card>
          <DataTable
            columnContentTypes={[
              'text',
              'numeric',
              'numeric',
              'text',
            ]}
            headings={[
              'Month',
              'Digital Hair Care Expert Commission',
              'Monthly Fee',
              'Total Paid',
            ]}
            rows={rows}
          />
        </Card>
      </Page>
    );
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
                      selected: false
                    },
                    {
                      url: '/billing',
                      label: 'BILLING',
                      icon: OrdersMajorTwotone,
                      selected: true
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
                <DisplayText size="Large">Billing</DisplayText> <hr/> 
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
                </Card>
                <Card title="" sectioned>
                  <Stack >                
                    <Stack.Item fill>
                      <Heading>Emma Beauty Payments</Heading>
                      <p>Summary of your previous payments to Emma Beauty</p>
                    </Stack.Item> 
                    <Stack.Item><Button primary>Export</Button></Stack.Item>                    
                  </Stack>
                                       
                  <Stack >
                    {this.DataTableExample()}
                  </Stack>
                  <Stack spacing="tight" distribution="center">
                    <Button plain>See More</Button>
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

export default Billing;
