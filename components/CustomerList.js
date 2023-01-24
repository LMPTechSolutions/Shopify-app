import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Card, ResourceList, Stack, Avatar, TextStyle, Thumbnail, TextField, 
} from '@shopify/polaris';
import TextFieldExample from './NumberField';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

const GET_CUSTOMERS_BY_ID = gql`
  query {
    customers(first:250) {
      edges {
        node {
          id
          displayName
          email
          note
        }
      }
    }
  }
`;

class CustomerList extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0
    };
  }
  
  render() {
    const app = this.context;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/edit-products',
      );
    };
    const adjustTotal = () => {
      // get total QTY
      // Adjsut Total
      console.log("Qty Chnage");
     
  
      // const redirect = Redirect.create(app);
      // redirect.dispatch(
      //   Redirect.Action.APP,
      //   '/edit-products',
      // );
    };

    const twoWeeksFromNow = new Date(Date.now() + 12096e5).toDateString();
    return (
      <Query query={GET_CUSTOMERS_BY_ID}>
        {({ data, loading, error }) => {
          if (loading) { return <div>Loading…</div>; }
          if (error) { return <div>{error.message}</div>; }
          console.log('customer data:',data.customers.edges);
          let customerList = [];
          data.customers.edges.forEach( customer => {
            
            if (customer.node.note) {
              let cleanCustomer = {
                id: customer.node.id,
                name: customer.node.displayName,
                note: customer.node.note,
                email: customer.node.email,
              };
              customerList.push(cleanCustomer)
            }
          });

          console.log('customerList:', customerList);

          return (
            <Card>
              <ResourceList
                resourceName={{singular: 'customer', plural: 'customers'}}
                items={customerList}
                renderItem={(item) => {
                  const {id, email, name, note} = item;
                  return (
                    <ResourceList.Item
                      id={id}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <h3>
                        <TextStyle variation="subdued">{name}</TextStyle>
                      </h3>
                      {/* <div>{email}</div> */}
                      <div><TextStyle variation="strong">{note}</TextStyle></div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default CustomerList;
