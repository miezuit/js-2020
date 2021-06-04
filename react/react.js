class Welcome extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const renderh1 = () => {
            if(this.props.name === 'Radu') {
                return <h1>Hello, sir!</h1>
            }
            return <h1>Hello {this.props.name.toUpperCase() } </h1>
        }
        const h1 = renderh1()
        return <div>{h1}</div>
    }
}
class Clicker extends React.Component {
    constructor() {
        super()
        // starea initiala a componentei
        this.state = {
            clicks: 0,
        }
    }
    // definind metoda ca arrow function se face automat bind la this
    increment = () => {
        this.setState({
            clicks: this.state.clicks + 1
        })
    };
    render() {
        return <button onClick={this.increment}>You clicked {this.state.clicks} times</button>
    }
}

const template = (
<div>
    <Welcome name='Radu'></Welcome>
    <Clicker></Clicker>
</div>
)

ReactDOM.render(
    template,
    document.getElementById('root')
)
