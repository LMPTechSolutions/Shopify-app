import {
  FormLayout, TextField, Select,
} from '@shopify/polaris';

class OptionsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {label: 'Dropdown', value: 'dropdown'},
        {label: 'Radio', value: 'Radio'},
      ], 
    };
  }

  render(){

    return (
    <div>
      <FormLayout>
        <FormLayout.Group>
          <TextField type="text" label="Display Name" onChange={() => {}} />
          <TextField type="text" label="Unique Name" onChange={() => {}} />
        </FormLayout.Group>
        <FormLayout.Group>
          <TextField type="text" label="Tooltip" onChange={() => {}} />
          <TextField type="text" label="Helptext" onChange={() => {}} />
        </FormLayout.Group>
        <Select
          label="Date range"
          options={this.state.options}
        />
      </FormLayout>
    </div>

    );
  }
}


export default OptionsModal;
