import {
  Button, Card, Layout, Page, DataTable, Form, FormLayout, TextField, EmptyState
} from '@shopify/polaris';
import store from 'store-js';
import OptionsModal from '../components/OptionsModal';
import CustomerList from '../components/CustomerList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, 
    };
  }  

  render(){
    const emptyState = !store.get('ids');

    return (
      <Page>
        <Layout>
          <Card sectioned>
            <Form noValidate >
              <FormLayout>
                <TextField type="url" />
              </FormLayout>
            </Form>
            <Card.Section>                
                <CustomerList />              
            </Card.Section>     
                    
          </Card>
        </Layout>
      </Page>
    );
  }
}

export default Customers;



// import {
//   Button,
//   Card,
//   Form,
//   FormLayout,
//   Layout,
//   Page,
//   Stack,
//   TextField,
// } from '@shopify/polaris';

// class Customers extends React.Component {
//   state = {
//     discount: '10%',
//   };

//   render() {
//     const { discount } = this.state;

//     return (
//       <Page>
//         <Layout>
//           <Layout.AnnotatedSection
//             title="Default discount"
//             description="Add a product to Sample App, it will automatically be discounted."
//           >
//             <Card sectioned>
//               <Form onSubmit={this.handleSubmit}>
//                 <FormLayout>
//                   <TextField
//                     value={discount}
//                     onChange={this.handleChange('discount')}
//                     label="Discount percentage"
//                     type="discount"
//                   />
//                   <Stack distribution="trailing">
//                     <Button primary submit>
//                       Save
//                     </Button>
//                   </Stack>
//                 </FormLayout>
//               </Form>
//             </Card>
//           </Layout.AnnotatedSection>
//         </Layout>
//       </Page>
//     );
//   }

//   handleSubmit = () => {
//     this.setState({
//       discount: this.state.discount,
//     });
//     console.log('submission', this.state);
//   };

//   handleChange = (field) => {
//     return (value) => this.setState({ [field]: value });
//   };
// }

// export default Customers;