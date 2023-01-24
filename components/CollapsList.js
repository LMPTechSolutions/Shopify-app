class CollapsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    };
    this.handleClick =  this.handleClick.bind(this);
    this.display =  this.display.bind(this);
    this.liClass =  this.liClass.bind(this);
    this.Item =  this.Item.bind(this);
  }

  handleClick(i){
    return (e) => {
      let active = this.state.active === i ? null : i
      this.setState({active: active})
    }
  }
  display(i){
    return this.state.active === i ? 'block' : 'none'
  }
  liClass(i){
    return this.state.active === i ? 'active' : 'inactive'
  }

  Item(props, i) {
    return(
      <li key={i} onClick={this.handleClick(i)}>
        <span>
          {props.name + '(' + props.price + ')'}
        </span>
        <div style={{display: this.display(i)}}>
          {props.details}
        </div>
      </li>
    )
  }


  render(){
    let {list} = this.props
    return (
      <ul className="faq-list">
       {list.map(this.Item)}
      </ul>
     )
  }
}




export default CollapsList;