import {
  FormLayout, TextField, Select, Checkbox,
} from '@shopify/polaris';

class OptionSetsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {label: 'Dropdown', },
        {label: 'Radio', },
      ]
    };
  }


  render(){
    return(
      <div>
        <FormLayout>
          <FormLayout.Group>
            <TextField type="text" label="Options Set Name" />
            <Select label="Pick Options below" options={this.state.options} />
          </FormLayout.Group>
          <FormLayout.Group>
            <table >
              <tr>
                <th>Option name</th>
                <th>Validate</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>Product Type</td>
                <td>
                  <Checkbox label="Required" />
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Product Type</td>
                <td>
                  <Checkbox label="Required" />
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr> 
            </table>
          </FormLayout.Group>
          <Select label="Date range" options={this.state.options} />
        </FormLayout>
      </div>
    );
  }
}


export default OptionSetsModal;
